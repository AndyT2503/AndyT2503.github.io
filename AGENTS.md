# AGENTS.md

This repository uses `.github/copilot-instructions.md` as the shared canonical instruction file.

Codex and other coding agents must read and follow `.github/copilot-instructions.md` before making changes in this repository. Do not duplicate those rules here; keep this file as the agent entry point that delegates to the shared instruction source.

Also read the specialized instruction files when the task scope requires them:

- Blog writing or blog content changes: `.github/blog.instructions.md`
- Unit, integration, or end-to-end tests: `.github/testing.instructions.md`

If repository guidance needs to change, update `.github/copilot-instructions.md` first so GitHub Copilot and Codex continue to share the same source of truth.
