import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import type { DesktopAPI, AppInfo } from '../shared/desktop';
import './style.css';
import { defaultLanguage, isLanguage, languages, messages, type Language } from './i18n';
declare global { interface Window { byte: DesktopAPI } }
function App() {
  const [language, setLanguage] = useState<Language>(defaultLanguage);
  const t = messages[language];
  useEffect(() => { document.documentElement.lang = language; }, [language]);
  const [info, setInfo] = useState<AppInfo>();
  const [error, setError] = useState(false);
  useEffect(() => { window.byte.getAppInfo().then(setInfo).catch(() => setError(true)); }, []);
  return <main>
    <header><span className="brand">BYTE / バイト</span><span className="badge">{t.badge}</span>
      <label className="language">{t.language}<select value={language} onChange={event => {
        if (isLanguage(event.target.value)) setLanguage(event.target.value);
      }}>{Object.entries(languages).map(([code, name]) => <option key={code} value={code} lang={code}>{name}</option>)}</select></label></header>
    <section className="welcome" aria-labelledby="welcome">
      <svg viewBox="0 0 200 180" role="img" aria-label={t.avatar}>
        <path d="M100 35V18" stroke="#16a899" strokeWidth="7"/><circle cx="100" cy="14" r="8" fill="#25c6af"/>
        <rect x="39" y="38" width="122" height="99" rx="35" fill="white" stroke="#b5ded7" strokeWidth="3"/>
        <rect x="55" y="57" width="90" height="54" rx="20" fill="#173f46"/>
        <path d="M72 83q8-14 16 0m24 0q8-14 16 0" fill="none" stroke="#64e9d2" strokeWidth="5" strokeLinecap="round"/>
        <path d="M94 97q6 5 12 0" fill="none" stroke="#64e9d2" strokeWidth="3"/>
        <path d="M32 93l-9 20m145-20 9 20M70 147l-6 12m66-12 6 12" stroke="#16a899" strokeWidth="12" strokeLinecap="round"/>
      </svg>
      <p className="eyebrow">{t.tagline}</p>
      <h1 id="welcome">{t.welcome}</h1>
      <p>{t.introduction}<br/>{t.description}</p>
    </section>
    <section className="status" aria-labelledby="status"><h2 id="status">{t.capabilities}</h2>
      <dl><div><dt>{t.desktop}</dt><dd>{t.available}</dd></div><div><dt>{t.chat}</dt><dd>{t.planned}</dd></div><div><dt>{t.capture}</dt><dd>{t.disabled}</dd></div></dl>
      <p>{t.offlineNotice}</p>
    </section>
    <footer aria-live="polite">{error ? t.metadataError : info ? `v${info.version} · ${info.platform} · ${t.mode}` : t.metadataLoading}</footer>
  </main>;
}
createRoot(document.getElementById('root')!).render(<App/>);
