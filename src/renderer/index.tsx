import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import type { DesktopAPI, AppInfo } from '../shared/desktop';
import './style.css';
declare global { interface Window { byte: DesktopAPI } }
function App() {
  const [info, setInfo] = useState<AppInfo>();
  const [error, setError] = useState(false);
  useEffect(() => { window.byte.getAppInfo().then(setInfo).catch(() => setError(true)); }, []);
  return <main>
    <header><span className="brand">BYTE / バイト</span><span className="badge">デスクトップ基盤</span></header>
    <section className="welcome" aria-labelledby="welcome">
      <svg viewBox="0 0 200 180" role="img" aria-label="白とティールのロボット Byte">
        <path d="M100 35V18" stroke="#16a899" strokeWidth="7"/><circle cx="100" cy="14" r="8" fill="#25c6af"/>
        <rect x="39" y="38" width="122" height="99" rx="35" fill="white" stroke="#b5ded7" strokeWidth="3"/>
        <rect x="55" y="57" width="90" height="54" rx="20" fill="#173f46"/>
        <path d="M72 83q8-14 16 0m24 0q8-14 16 0" fill="none" stroke="#64e9d2" strokeWidth="5" strokeLinecap="round"/>
        <path d="M94 97q6 5 12 0" fill="none" stroke="#64e9d2" strokeWidth="3"/>
        <path d="M32 93l-9 20m145-20 9 20M70 147l-6 12m66-12 6 12" stroke="#16a899" strokeWidth="12" strokeLinecap="round"/>
      </svg>
      <p className="eyebrow">あなたの仕事に、そっと寄り添う。</p>
      <h1 id="welcome">こんにちは、Byte です。</h1>
      <p>小さな一歩から、一緒に。<br/>現在はデスクトップアプリの基盤を準備しています。</p>
    </section>
    <section className="status" aria-labelledby="status"><h2 id="status">現在の機能</h2>
      <dl><div><dt>デスクトップウィンドウ</dt><dd>利用可能</dd></div><div><dt>AI チャット・メモリ</dt><dd>今後対応</dd></div><div><dt>マイク・画面の取得</dt><dd>無効</dd></div></dl>
      <p>このバージョンは AI に接続しません。アカウント登録は不要です。</p>
    </section>
    <footer aria-live="polite">{error ? 'アプリ情報を取得できませんでした。再起動してください。' : info ? `v${info.version} · ${info.platform} · オフライン基盤` : 'アプリ情報を確認中…'}</footer>
  </main>;
}
createRoot(document.getElementById('root')!).render(<App/>);
