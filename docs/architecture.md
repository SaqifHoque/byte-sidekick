# Architecture and privacy

## Shell boundary

Electron main owns native lifecycle. React renders packaged local content. The sandboxed, context-isolated preload exposes only `getAppInfo()`; it cannot read files, run commands, invoke arbitrary channels, or access credentials. Main verifies IPC requests come from the packaged main frame. New windows, navigation, and permission requests/checks are denied. CSP forbids renderer network connections, inline scripts, remote resources, and form submission.

This foundation follows Electron's official security guidance: https://www.electronjs.org/docs/latest/tutorial/security/ and sandbox guidance: https://www.electronjs.org/docs/latest/tutorial/sandbox/ (reviewed 2026-10-23).

The native standard window supports normal OS movement, resizing, keyboard navigation, minimize, close, and macOS Dock reactivation. Transparent avatar behavior is a later feature.

## Planned module boundaries

- Desktop lifecycle/native permissions: privileged main process.
- Avatar and conversation UI: isolated React renderer.
- Providers, context adapters, SQLite memory/retrieval, action review, suggestion policy, speech, settings and audit: separate typed modules in subsequent PRs.
- Provider input/output validation and action approval belong in the privileged layer. An expression or model response never grants execution permission.

## Current capability matrix

| Capability | Status |
| --- | --- |
| Native standard window and Japanese welcome | Working |
| Read-only app metadata IPC | Working |
| Microphone, capture, external sync | Unavailable; permission requests denied |
| Model inference and conversation | Planned; no simulated AI responses |
| Avatar animation/tray/shortcut | Planned |
| SQLite memory/settings/history | Planned |
| Voice/connectors/action execution | Planned |
| Signed installers/updates | Planned |

## Data lifecycle

This shell sends no model/context data and stores no application messages, memory, captures, or credentials. Electron/Chromium may create its normal runtime profile under the OS user-data directory; this is not an encrypted application database. Do not enter secrets into future sample configuration. `.env.example` contains no keys. Telemetry is not implemented.

Later PRs must add explicit provider/data-sharing setup, OS credential storage, source approval and revocation, separate retention controls, SQLite migrations, and reviewed action execution. No memory schema or provider adapter is represented as implemented here.

## Languages

English and Japanese are available through the header language selector. Japanese remains the initial default. The selector updates every visible message, the robot's accessible label, and the document language. Selection lasts for the current window session; persistence will be added with settings. UI language and future AI output language will be separate preferences.

`src/renderer/i18n.ts` defines a typed message catalog; additional languages must implement all message keys. Vietnamese remains planned, with English and Japanese prioritized for implementation and evaluation.
