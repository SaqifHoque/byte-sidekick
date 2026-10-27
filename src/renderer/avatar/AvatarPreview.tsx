import type { Messages } from '../i18n';
import { ByteAvatar } from './ByteAvatar';
import { expressions } from './state';
import { useAvatar } from './useAvatar';
export function AvatarPreview({ t }: { t: Messages }) {
  const state = useAvatar();
  return <section className="avatar-preview" aria-labelledby="avatar-preview-title">
    <h2 id="avatar-preview-title">{t.preview}</h2>
    <ByteAvatar expression={state.emotion} interaction={state.interaction} intensity={state.amount}
      reducedMotion={state.motionOff} label={`${t.avatar}: ${t[state.emotion]}`}/>
    <p id="preview-note">{t.previewNote}</p>
    <div className="avatar-controls">
      <label>{t.expressionLabel}<select aria-describedby="preview-note" data-testid="expression" value={state.emotion} onChange={event => state.select(event.target.value)}>
        {expressions.map(value => <option key={value} value={value}>{t[value]}</option>)}
      </select></label>
      <label>{t.intensityLabel}<input type="range" min="0" max="1" step="0.1" value={state.amount} onChange={event => state.setAmount(Number(event.target.value))}/></label>
      <label><input type="checkbox" checked={state.reducedMotion} onChange={event => state.setReducedMotion(event.target.checked)}/>{t.reducedMotionLabel}</label>
    </div>
  </section>;
}
