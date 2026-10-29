import { useEffect, useRef, useState } from 'react';
import { expression, MIN_EXPRESSION_HOLD_MS, type Expression, type Interaction } from './state';
export function useAvatar() {
  const [emotion, setEmotion] = useState<Expression>('neutral');
  const [amount, setAmount] = useState(0.5);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [systemReducedMotion, setSystemReducedMotion] = useState(() => matchMedia('(prefers-reduced-motion: reduce)').matches);
  const lastChange = useRef(-Infinity);
  useEffect(() => {
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setSystemReducedMotion(media.matches);
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);
  const select = (value: unknown) => {
    const now = performance.now();
    if (now - lastChange.current < MIN_EXPRESSION_HOLD_MS) return;
    const next = expression(value);
    if (next === emotion) return;
    lastChange.current = now;
    setEmotion(next);
  };
  // Preview mappings are visual only; they never start capture, audio, or inference.
  const interaction: Interaction = emotion === 'listening' || emotion === 'thinking' || emotion === 'speaking' || emotion === 'focus' ? emotion : 'idle';
  return { emotion, amount, setAmount, select, interaction, reducedMotion, setReducedMotion, motionOff: reducedMotion || systemReducedMotion };
}
