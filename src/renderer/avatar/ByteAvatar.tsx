import { expression, intensity, type AvatarState } from './state';
import './avatar.css';

const eyes = {
  neutral: 'M72 80v7m56-7v7', happy: 'M70 84q9-15 18 0m24 0q9-15 18 0',
  excited: 'M70 78l9 7-9 7m60-14-9 7 9 7', listening: 'M76 77v12m48-12v12',
  thinking: 'M70 83h15m30 0h15', speaking: 'M76 79v7m48-7v7',
  curious: 'M70 85h15m39-10v13', concerned: 'M70 77l15 6m30 0 15-6',
  sad: 'M70 79l15-4m30 0 15 4', crying: 'M70 82q9-9 18 0m24 0q9-9 18 0',
  embarrassed: 'M72 82h13m30 0h13', focus: 'M70 84q9 8 18 0m24 0q9 8 18 0',
} as const;
interface Props extends AvatarState { label: string; reducedMotion: boolean }
export function ByteAvatar({ interaction, expression: requested, intensity: amount, label, reducedMotion }: Props) {
  const emotion = expression(requested);
  const level = intensity(amount);
  return <div className="byte-avatar" data-expression={emotion} data-interaction={interaction}
    data-motion={reducedMotion || level === 0 ? 'off' : 'on'} data-level={level < 0.34 ? 'low' : level < 0.67 ? 'medium' : 'high'}>
    <div className="byte-float"><svg viewBox="0 0 200 180" role="img" aria-label={label}>
      <path d="M100 38V18" stroke="#16a899" strokeWidth="7"/>
      <circle className="byte-antenna" cx="100" cy="14" r="8" fill="#25c6af"/>
      <path d="M32 93l-9 20m145-20 9 20M70 147l-6 12m66-12 6 12" stroke="#16a899" strokeWidth="12" strokeLinecap="round"/>
      <rect x="39" y="38" width="122" height="99" rx="35" fill="white" stroke="#b5ded7" strokeWidth="3"/>
      <rect x="55" y="57" width="90" height="54" rx="20" fill="#173f46"/>
      <path key={emotion} className="byte-eyes" d={eyes[emotion]} fill="none" stroke="#64e9d2" strokeWidth="5" strokeLinecap="round"/>
      {emotion === 'speaking' ? <ellipse className="byte-mouth" cx="100" cy="98" rx="6" ry="4" fill="#64e9d2"/> :
        <path d={emotion === 'sad' || emotion === 'concerned' || emotion === 'crying' ? 'M94 100q6-6 12 0' : 'M94 97q6 5 12 0'} fill="none" stroke="#64e9d2" strokeWidth="3"/>}
      {emotion === 'thinking' ? <g className="byte-dots" fill="#64e9d2"><circle cx="91" cy="101" r="2"/><circle cx="100" cy="101" r="2"/><circle cx="109" cy="101" r="2"/></g> : null}
      {emotion === 'crying' ? <g className="byte-tears" fill="#74cfff"><path d="M76 89q-8 14 0 14t0-14"/><path d="M124 89q-8 14 0 14t0-14"/></g> : null}
      {emotion === 'embarrassed' ? <g fill="#f598a8"><ellipse cx="65" cy="96" rx="5" ry="3"/><ellipse cx="135" cy="96" rx="5" ry="3"/></g> : null}
    </svg></div>
  </div>;
}
