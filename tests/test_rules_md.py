# pytest-based tests for RULES.md content and YAML front matter
# Testing Library/Framework: pytest (Python)
# These tests validate:
# - YAML front matter keys, types, and required values
# - Presence and order of critical headings
# - Presence of essential rule bullet points and phrases
# - Basic sanity checks on patterns in 'globs'

from __future__ import annotations
import io
import os
import re
from typing import List, Dict, Any, Tuple

# Resolve rules file path dynamically (kept in sync with change script)
CANDIDATE_PATHS = [
    # Most likely discovered path will be injected by the change script via env
    os.environ.get("RULES_FILE", "").strip(),
    "RULES.md",
    "rules.md",
    os.path.join("docs", "RULES.md"),
    os.path.join("docs", "rules.md"),
    os.path.join("docs", "project-rules.md"),
]

def _read_rules_file() -> Tuple[str, str]:
    paths = [p for p in CANDIDATE_PATHS if p]
    for p in paths:
        if os.path.isfile(p):
            with io.open(p, "r", encoding="utf-8") as f:
                content = f.read()
            return p, content
    raise FileNotFoundError(f"Could not locate rules markdown file in candidates: {paths!r}")

def _extract_front_matter(md: str) -> str:
    # Extract content between the first pair of --- delimiters at the very start
    m = re.match(r"^---\n(.*?)\n---\n", md, flags=re.DOTALL)
    if not m:
        raise AssertionError("YAML front matter block delimited by --- not found at top of file.")
    return m.group(1)

def _parse_simple_yaml(yaml_text: str) -> Dict[str, Any]:
    """
    Lightweight, dependency-free parser for the known simple YAML front matter shape:
      description: "..."
      globs:
        - "/app/**"
        - "/components/**"
        - "/lib/**"
      alwaysApply: true
      version: 1
    This is NOT a general YAML parser; it only supports what we need for these tests.
    """
    lines = yaml_text.splitlines()
    result: Dict[str, Any] = {}
    i = 0
    while i < len(lines):
        line = lines[i].rstrip()
        if not line or line.strip().startswith("#"):
            i += 1
            continue
        if re.match(r"^\s*globs\s*:\s*$", line):
            # Collect list items
            i += 1
            items: List[str] = []
            while i < len(lines) and re.match(r"^\s*-\s", lines[i]):
                item_line = lines[i].strip()
                # Format: - "value" or - value
                m = re.match(r"^-\s*\"?(.*?)\"?\s*$", item_line)
                if not m:
                    raise AssertionError(f"Invalid list item format in globs: {item_line!r}")
                items.append(m.group(1))
                i += 1
            result["globs"] = items
            continue
        # key: value
        m = re.match(r"^\s*([A-Za-z0-9_]+)\s*:\s*(.*?)\s*$", line)
        if not m:
            raise AssertionError(f"Unrecognized YAML line: {line!r}")
        key, raw = m.group(1), m.group(2)
        if raw.startswith('"') and raw.endswith('"'):
            val: Any = raw[1:-1]
        elif raw.lower() in ("true", "false"):
            val = raw.lower() == "true"
        else:
            # attempt int, else as string
            val = int(raw) if re.fullmatch(r"-?\d+", raw) else raw
        result[key] = val
        i += 1
    return result

def test_front_matter_schema_and_values():
    path, content = _read_rules_file()
    fm = _extract_front_matter(content)
    data = _parse_simple_yaml(fm)

    # Required keys
    for key in ("description", "globs", "alwaysApply", "version"):
        assert key in data, f"Missing front matter key: {key}"

    # Types
    assert isinstance(data["description"], str) and data["description"].strip(), "description must be a non-empty string"
    assert isinstance(data["globs"], list) and data["globs"], "globs must be a non-empty list"
    assert isinstance(data["alwaysApply"], bool), "alwaysApply must be boolean"
    assert isinstance(data["version"], int), "version must be integer"

    # Expected values / members
    expected_globs = {"/app/**", "/components/**", "/lib/**"}
    assert expected_globs.issubset(set(data["globs"])), f"globs must include {expected_globs}, got {data['globs']}"
    assert data["alwaysApply"] is True, "alwaysApply must be true"
    assert data["version"] >= 1, "version should be >= 1"
    assert "Polling App with QR Code Sharing" in data["description"], "description should reference the Polling App with QR Code Sharing"

def test_headings_present_and_in_order():
    _, content = _read_rules_file()
    # capture headings lines starting with ##
    headings = re.findall(r"^(#{2,3})\s+(.*)$", content, flags=re.MULTILINE)
    titles_in_order = [h[1].strip() for h in headings]

    expected_sequence = [
        "Polling App Project Rules",
        "1. Folder Structure",
        "2. Forms & UI",
        "3. Supabase Usage",
        "4. AI-Assisted Patterns",
        "5. Verification",
    ]

    # Ensure each expected heading exists and appears in order
    indices = []
    for exp in expected_sequence:
        try:
            idx = titles_in_order.index(exp)
        except ValueError:
            raise AssertionError(f"Expected heading not found: {exp!r}. Found: {titles_in_order!r}") from None
        indices.append(idx)
    assert indices == sorted(indices), f"Headings are out of order: positions {indices} for {expected_sequence}"

def test_core_rules_keywords_present():
    _, content = _read_rules_file()
    # Check for critical phrases that encode the rules' intent
    required_phrases = [
        r"`react-hook-form`",
        r"shadcn/ui",
        r"Server Action",
        r"Supabase",
        r"\.env\.local",
        r"process\.env",
        r"/app/polls/",
        r"/app/api/",
        r"/components/ui/",
        r"/lib/",
    ]
    for pattern in required_phrases:
        assert re.search(pattern, content), f"Missing required rule phrase/pattern: {pattern}"

def test_no_hardcoded_supabase_keys_present():
    _, content = _read_rules_file()
    # Basic heuristics to avoid leaking credentials in docs
    forbidden_patterns = [
        r"SUPABASE_[A-Z_]*KEY\s*=",
        r"anon\s*key",
        r"service[_\s-]*role",
        r"https://[a-z0-9-]+\.supabase\.co/[a-z0-9/_-]+",
    ]
    for pat in forbidden_patterns:
        assert not re.search(pat, content, flags=re.IGNORECASE), f"Forbidden credential-like pattern found: {pat}"

def test_globs_format_and_uniqueness():
    _, content = _read_rules_file()
    fm = _extract_front_matter(content)
    data = _parse_simple_yaml(fm)
    globs = data["globs"]
    # uniqueness
    assert len(globs) == len(set(globs)), f"Duplicate entries in globs: {globs}"
    # pattern sanity: must start with / and typically end with /**
    for g in globs:
        assert g.startswith("/"), f"Glob should be absolute-like and start with '/': {g}"
        assert g.endswith("/**"), f"Glob should end with '/**' to cover subpaths: {g}"

def test_verification_checklist_items_present():
    _, content = _read_rules_file()
    checklist_items = [
        r"Are routes in `/app/polls` and `/app/api`\?",
        r"Are forms using `react-hook-form` and shadcn/ui components\?",
        r"Are Supabase keys and operations secure and correct\?",
        r"Does AI-generated code follow the existing folder structure and server/client component rules\?",
    ]
    for pat in checklist_items:
        assert re.search(pat, content), f"Missing verification checklist item matching: {pat}"