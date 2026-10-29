export const expressions = ['neutral', 'happy', 'excited', 'listening', 'thinking', 'speaking', 'curious', 'concerned', 'sad', 'crying', 'embarrassed', 'focus'] as const;
export type Expression = typeof expressions[number];
export type Interaction = 'idle' | 'listening' | 'thinking' | 'speaking' | 'focus';
export const MIN_EXPRESSION_HOLD_MS = 600;
export function expression(value: unknown): Expression {
  return expressions.includes(value as Expression) ? value as Expression : 'neutral';
}
export function intensity(value: number): number {
  return Number.isFinite(value) ? Math.max(0, Math.min(1, value)) : 0.5;
}
// Presentation only: these records cannot authorize actions or native permissions.
export interface AvatarState { interaction: Interaction; expression: Expression; intensity: number }
