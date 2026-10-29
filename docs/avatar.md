# Animated Byte

The original vector renderer is `src/renderer/avatar/ByteAvatar.tsx`; it can be replaced without changing the presentation contract in `state.ts`. Interaction state (idle/listening/thinking/speaking/focus) is independent from expression. Unknown expressions fall back to neutral, intensity is clamped, and the contract grants no native permissions or action authority.

The shell offers twelve expressions: neutral, happy, excited, listening, thinking, speaking, curious, concerned, sad, crying, embarrassed, and focus/resting. Preview controls and accessible labels support English/Japanese. These are simulated expressions; listening does not record, thinking does not invoke a model, and speaking has a synthetic loop without audio or phoneme synchronization. Crying is available only by explicit selection.

CSS supplies quiet floating, listening antenna glow, thinking tilt/dots, and a single happy/excited bounce. Intensity changes motion in three levels; zero disables animation. Focus is still. Expression changes are held for at least 600 ms, with rapid requests discarded rather than queued. Re-selecting an expression does not restart celebration. Reduced motion can be enabled manually and always respects the OS preference. Controls are keyboard accessible. Settings are session-only until the settings PR.

No animation library, timers per animation frame, model dependency, network access, or audio is added. GPU/CPU/RAM budgets have not been measured. Transparent windows, dragging/tray/shortcut behavior belong to PR #3.

Validation: contract tests cover malformed state and intensity. Native Electron smoke cycles through all twelve expressions, verifies accessible labels, and checks that manual reduced motion removes computed animations. Visual aesthetics and OS assistive-technology behavior still require human review; Windows remains unverified locally.
