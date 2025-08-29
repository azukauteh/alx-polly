This repository's tests for launch.json are written in plain pytest style but avoid pytest-only fixtures,
so they can run under `pytest` or vanilla `unittest` discovery (via pytest).
No additional dependencies are required.

The primary validations include the following:
- The launch.json exists (prefer .vscode/launch.json)
- JSON parses even with VS Code-style // comments (simple in-file stripper)
- top-level keys: version="0.2.0", configurations is a list
- at least one Chrome "launch" config targeting <http://localhost:8080> with webRoot=${workspaceFolder}
- sanity checks for all configurations' minimal keys

To run:
- pytest -q
or
- python -m pytest -q