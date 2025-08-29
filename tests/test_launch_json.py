"""
Tests for VS Code debug configuration (launch.json).

Detected test framework: pytest preferred if available; otherwise unittest-compatible.
No external dependencies required.
"""

from __future__ import annotations

import json
import re
from pathlib import Path
from typing import Any, Dict, List, Optional
import urllib.parse as urlparse

# --- Helpers -----------------------------------------------------------------

def _possible_launch_paths() -> List[Path]:
    """
    Return plausible locations of launch.json in this repo.
    Preference order:
      .vscode/launch.json, launch.json at root, any other 'launch.json' found.
    """
    root = Path(__file__).resolve().parents[1]
    candidates: List[Path] = []
    candidates.append(root / ".vscode" / "launch.json")
    candidates.append(root / "launch.json")

    # Append any other launch.json occurrences, de-duplicated
    for p in root.rglob("launch.json"):
        if p not in candidates:
            candidates.append(p)
    return [p for p in candidates if p.exists()]


COMMENT_LINE_RE = re.compile(r'^\s*//')
COMMENT_INLINE_RE = re.compile(r'(^|[^{"])\s//.*$')

def _strip_json_comments(text: str) -> str:
    """Remove // line comments safely from VS Code JSON-like files."""
    cleaned_lines: List[str] = []
    for line in text.splitlines():
        if COMMENT_LINE_RE.search(line):
            # Entire line is comment; drop it
            continue
        # Remove inline // comments not inside strings (best-effort)
        # We implement a minimal string-aware scan:
        out = []
        in_string = False
        escaped = False
        i = 0
        while i < len(line):
            ch = line[i]
            if ch == '"' and not escaped:
                in_string = not in_string
            if not in_string and ch == '/' and i + 1 < len(line) and line[i+1] == '/':
                break  # start of inline comment
            out.append(ch)
            escaped = (ch == '\\' and not escaped)
            if ch != '\\':
                escaped = False
            i += 1
        cleaned_lines.append(''.join(out).rstrip())
    return '\n'.join(cleaned_lines)


def _load_launch_json(path: Path) -> Dict[str, Any]:
    text = path.read_text(encoding="utf-8")
    try:
        return json.loads(text)
    except json.JSONDecodeError:
        # Try stripping comments (VS Code allows comments)
        cleaned = _strip_json_comments(text)
        return json.loads(cleaned)


def _find_chrome_localhost_config(cfgs: List[Dict[str, Any]]) -> Optional[Dict[str, Any]]:
    for c in cfgs:
        if (
            isinstance(c, dict)
            and c.get("type") == "chrome"
            and c.get("request") == "launch"
            and isinstance(c.get("url"), str)
            and "localhost" in c["url"]
        ):
            return c
    return None


# --- Tests -------------------------------------------------------------------

def test_launch_json_file_present():
    paths = _possible_launch_paths()
    assert paths, "Expected to find .vscode/launch.json (preferred) or a launch.json in repository."


def test_launch_json_parses_with_or_without_comments():
    path = _possible_launch_paths()[0]
    raw = path.read_text(encoding="utf-8")
    # Sanity: file likely contains comment lines
    has_comment_like = ("//" in raw)
    try:
        data = json.loads(raw)
    except json.JSONDecodeError:
        data = json.loads(_strip_json_comments(raw))
    assert isinstance(data, dict), "Parsed launch.json must be a JSON object."
    # If comments found, ensure our stripper changed something
    if has_comment_like:
        cleaned = _strip_json_comments(raw)
        assert "\n//" not in cleaned, "Comment stripper should remove line comments."


def test_top_level_structure_and_version():
    path = _possible_launch_paths()[0]
    data = _load_launch_json(path)
    assert "version" in data, "Top-level 'version' is required."
    assert isinstance(data["version"], str), "'version' must be a string."
    # The diff indicates version '0.2.0' is expected
    assert data["version"] == "0.2.0", "Expected VS Code launch.json version to be '0.2.0'."

    assert "configurations" in data, "Top-level 'configurations' is required."
    assert isinstance(data["configurations"], list), "'configurations' must be a list."


def test_chrome_launch_against_localhost_exists_and_is_valid():
    path = _possible_launch_paths()[0]
    data = _load_launch_json(path)
    cfgs = data.get("configurations", [])
    chrome_cfg = _find_chrome_localhost_config(cfgs)
    assert chrome_cfg is not None, "Must include a Chrome launch configuration targeting localhost."

    # Validate required fields from the diff
    assert chrome_cfg.get("type") == "chrome", "Chrome debug configuration must have type='chrome'."
    assert chrome_cfg.get("request") == "launch", "Chrome debug configuration must have request='launch'."
    assert chrome_cfg.get("name") == "Launch Chrome against localhost", "Unexpected debug configuration name."

    url = chrome_cfg.get("url")
    assert isinstance(url, str), "'url' must be a string."
    parsed = urlparse.urlparse(url)
    assert parsed.scheme in ("http", "https"), "URL must include http/https scheme."
    assert parsed.hostname in ("localhost", "127.0.0.1"), "URL should target localhost."
    # Port check: default from diff is 8080
    port = parsed.port or (80 if parsed.scheme == "http" else 443)
    assert port == 8080, "Expected localhost port 8080 per configuration."

    web_root = chrome_cfg.get("webRoot")
    assert isinstance(web_root, str), "'webRoot' must be a string."
    assert "${workspaceFolder}" in web_root, "'webRoot' should reference ${workspaceFolder}."


def test_all_configurations_have_minimum_required_keys():
    path = _possible_launch_paths()[0]
    data = _load_launch_json(path)
    cfgs = data.get("configurations", [])
    required = {"type", "request", "name"}
    for i, cfg in enumerate(cfgs):
        assert isinstance(cfg, dict), f"Configuration at index {i} must be an object."
        missing = required - set(cfg.keys())
        assert not missing, f"Configuration at index {i} is missing required keys: {sorted(missing)}"


def test_handles_unexpected_input_gracefully_with_clear_errors(tmp_path: Path):
    # Provide intentionally malformed JSON to ensure our loader raises a clear error after stripping comments
    bad = tmp_path / "launch.json"
    bad.write_text('{ // comment only\n "version": 1, /* block? not supported */ \n "configurations": "not-a-list" \n}', encoding="utf-8")
    # First, stripping comments should remove // but not /* */ (we don't support block comments).
    # After stripping, JSON parsing should succeed or fail clearly; then structure assertions will fail.
    try:
        data = _load_launch_json(bad)
    except json.JSONDecodeError:
        # Acceptable: block comments make JSON invalid; ensure error type is clear
        return
    # If it parsed, assert structure issues are caught
    assert isinstance(data.get("version"), (str,)), "Version must be a string when present."
    assert isinstance(data.get("configurations"), list) is True, "Configurations should be a list when present."


def test_url_is_well_formed_for_all_launch_configs():
    path = _possible_launch_paths()[0]
    data = _load_launch_json(path)
    cfgs = data.get("configurations", [])
    for i, cfg in enumerate(cfgs):
        if cfg.get("request") == "launch" and "url" in cfg:
            url = cfg["url"]
            assert isinstance(url, str), f"config[{i}].url must be a string"
            p = urlparse.urlparse(url)
            assert p.scheme in ("http", "https"), f"config[{i}].url must include http/https scheme"
            assert p.hostname, f"config[{i}].url must include a hostname"