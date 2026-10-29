# Verification

Environment: macOS ARM64. Host default Node is 18; verification uses Node 22 because Electron 45 requires Node >=22.12 for its tooling.

Automated checks cover TypeScript, production bundling, main-process permission denial, navigation/popup denial, trusted-frame IPC acceptance, rejected foreign-frame/URL IPC, and renderer CSP. A native Electron smoke check exercises the real renderer and preload.

A macOS/Windows CI template is supplied at `docs/ci-workflow.yml.example`; CI is not active. The publishing token lacks the workflow scope required to create `.github/workflows/check.yml`. A maintainer with that permission can copy the template there. Windows checks have not been run locally. No Windows runtime, installer, signing/notarization, real-model test, Phase 1 acceptance test, or CPU/RAM baseline is claimed. Native visual interaction and assistive-technology testing remain manual follow-up checks.

## Results on 2026-10-23

- Node 22.23.4: `npm run check` passed (TypeScript, 2 security tests, production build).
- Electron 45.0.0, macOS ARM64: native `npm run smoke` passed (React heading, IPC round trip, no renderer Node globals).
- The agent host sets `ELECTRON_RUN_AS_NODE=1`; native launch was verified with that host flag removed using `env -u ELECTRON_RUN_AS_NODE`. Normal desktop shells should not set this flag.
- `git diff --check` passed before publication.

English/Japanese update: typecheck, both security tests, and production build passed. The native macOS smoke test additionally switched Japanese → English → Japanese and verified the heading and document language after each change. Language persistence remains deferred to settings.

## Animated Byte results — 2026-10-27

macOS ARM64, cached Node 22 runtime: TypeScript checking, all three tests (including avatar boundary validation), and production build passed. Native Electron smoke passed: renderer isolation, English/Japanese switching, all twelve expression selections, accessible focus label, and manual reduced-motion animation suppression. Checks were run directly with the cached runtime because npm package resolution stalled in this environment. `git diff --check` passed.

React review: extracted avatar/control components, hook subscription cleanup, complete effect dependencies, typed message keys, labeled native controls, no animation frame state updates, no new runtime dependencies. OS reduced-motion CSS and media-query subscription are implemented; an OS-setting toggle and screen-reader session were not manually tested. No memory/CPU baseline or Windows runtime result is claimed.
