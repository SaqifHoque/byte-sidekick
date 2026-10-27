import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import type { DesktopAPI, AppInfo } from '../shared/desktop';
import './style.css';
import { AvatarPreview } from './avatar/AvatarPreview';
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
      <p className="eyebrow">{t.tagline}</p>
      <h1 id="welcome">{t.welcome}</h1>
      <p>{t.introduction}<br/>{t.description}</p>
    </section>
    <AvatarPreview t={t}/>
    <section className="status" aria-labelledby="status"><h2 id="status">{t.capabilities}</h2>
      <dl><div><dt>{t.desktop}</dt><dd>{t.available}</dd></div><div><dt>{t.chat}</dt><dd>{t.planned}</dd></div><div><dt>{t.capture}</dt><dd>{t.disabled}</dd></div></dl>
      <p>{t.offlineNotice}</p>
    </section>
    <footer aria-live="polite">{error ? t.metadataError : info ? `v${info.version} · ${info.platform} · ${t.mode}` : t.metadataLoading}</footer>
  </main>;
}
createRoot(document.getElementById('root')!).render(<App/>);
