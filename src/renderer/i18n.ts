export const languages = { ja: '日本語', en: 'English' } as const;
export type Language = keyof typeof languages;
export const defaultLanguage: Language = 'ja';

const ja = {
  preview: '表情プレビュー', previewNote: '表示のみのプレビューです。マイク・音声・AI は作動しません。',
  expressionLabel: '表情', intensityLabel: '表現の強さ', reducedMotionLabel: '動きを減らす',
  neutral: '通常', happy: 'うれしい', excited: 'わくわく', listening: '聞く', thinking: '考える', speaking: '話す', curious: '興味', concerned: '心配', sad: '悲しい', crying: '涙', embarrassed: '照れる', focus: '集中・休息',
  language: '言語 / Language', badge: 'デスクトップ基盤', avatar: '白とティールのロボット Byte',
  tagline: 'あなたの仕事に、そっと寄り添う。', welcome: 'こんにちは、Byte です。',
  introduction: '小さな一歩から、一緒に。', description: '現在はデスクトップアプリの基盤を準備しています。',
  capabilities: '現在の機能', desktop: 'デスクトップウィンドウ', available: '利用可能',
  chat: 'AI チャット・メモリ', planned: '今後対応', capture: 'マイク・画面の取得', disabled: '無効',
  offlineNotice: 'このバージョンは AI に接続しません。アカウント登録は不要です。',
  metadataError: 'アプリ情報を取得できませんでした。再起動してください。',
  metadataLoading: 'アプリ情報を確認中…', mode: 'オフライン基盤',
};
export type Messages = { [Key in keyof typeof ja]: string };
const en: Messages = {
  preview: 'Expression preview', previewNote: 'Visual preview only. Microphone, audio and AI remain off.',
  expressionLabel: 'Expression', intensityLabel: 'Expressiveness', reducedMotionLabel: 'Reduce motion',
  neutral: 'Neutral', happy: 'Happy', excited: 'Excited', listening: 'Listening', thinking: 'Thinking', speaking: 'Speaking', curious: 'Curious', concerned: 'Concerned', sad: 'Sad', crying: 'Crying', embarrassed: 'Embarrassed', focus: 'Focus / resting',
  language: 'Language / 言語', badge: 'Desktop foundation', avatar: 'Byte, a white and teal robot',
  tagline: 'A little company for your workday.', welcome: 'Hello, I’m Byte.',
  introduction: 'One small step at a time, together.', description: 'The desktop app foundation is taking shape.',
  capabilities: 'Current capabilities', desktop: 'Desktop window', available: 'Available',
  chat: 'AI chat and memory', planned: 'Planned', capture: 'Microphone and screen capture', disabled: 'Disabled',
  offlineNotice: 'This version does not connect to AI. No account is required.',
  metadataError: 'Could not load app information. Please restart.',
  metadataLoading: 'Loading app information…', mode: 'Offline foundation',
};
// Each new locale must supply the complete message contract before it can be selected.
export const messages: Record<Language, Messages> = { ja, en };
export function isLanguage(value: string): value is Language {
  return Object.prototype.hasOwnProperty.call(languages, value);
}
