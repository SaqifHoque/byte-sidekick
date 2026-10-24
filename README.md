# Byte

An installable Windows/macOS AI desktop companion, with Japanese as the default work language.

Implementation: Electron + TypeScript + React, with privileged desktop services separated from the renderer. SQLite persistence and replaceable model adapters follow in focused PRs.

See [product requirements](docs/product-brief.txt) and the [delivery plan](docs/roadmap.md).

## Run locally

Use Node 22.12+ (see `.nvmrc`) and npm 10+ on macOS or Windows.

```sh
npm ci
npm start
npm run check
npm run smoke
```

`npm start` builds and opens a native standard window. `smoke` launches Electron, checks the rendered Japanese heading, read-only IPC, and renderer isolation, then exits. Build output is in `dist/`; installer packaging is planned in PRs 28–29. No installer command exists yet.

PR 1 provides a secure shell and Japanese capability screen. It does not yet provide conversation, animation, an avatar window, tray controls, settings, or memory. Follow the [roadmap](docs/roadmap.md) for those focused PRs.

See [architecture and privacy](docs/architecture.md) and [verification results](docs/verification.md).

English and Japanese UI are available from the header language selector (Japanese by default). Selection currently lasts for the window session. Additional languages, including Vietnamese, are planned; English/Japanese are the current priority.

Planned local AI default: **Qwen3.5 4B via Ollama** (`qwen3.5:4b`), selected for implementation in PR #5. It is not connected in the current shell. See the [model decision](docs/architecture.md#local-model-decision-2026-10-25).
