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

The shell provides English/Japanese UI and an animated vector Byte expression preview. It does not yet provide conversation, a transparent avatar window, tray controls, settings, or memory. Follow the [roadmap](docs/roadmap.md) for those focused PRs.

See [architecture and privacy](docs/architecture.md) and [verification results](docs/verification.md).

English and Japanese UI are available from the header language selector (Japanese by default). Selection currently lasts for the window session. Additional languages, including Vietnamese, are planned; English/Japanese are the current priority.

Use the expression preview to explore Byte’s twelve expressions, expressiveness, and reduced-motion controls. These are visual previews; microphone, audio, and model inference remain off. See [avatar behavior](docs/avatar.md).
