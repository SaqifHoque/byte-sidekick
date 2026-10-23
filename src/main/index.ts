import { app, BrowserWindow, session, ipcMain } from 'electron';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { APP_INFO_CHANNEL } from '../shared/desktop';

app.whenReady().then(() => {
  session.defaultSession.setPermissionRequestHandler((_contents, _permission, callback) => callback(false));
  session.defaultSession.setPermissionCheckHandler(() => false);
  const entry = path.join(__dirname, 'index.html');
  ipcMain.handle(APP_INFO_CHANNEL, event => {
    if (event.senderFrame !== event.sender.mainFrame || event.senderFrame.url !== pathToFileURL(entry).href) {
      throw new Error('Untrusted IPC sender');
    }
    return { version: app.getVersion(), platform: process.platform, mode: 'offline-shell' };
  });
  const createWindow = () => {
    const window = new BrowserWindow({
      width: 820, height: 700, minWidth: 540, minHeight: 500, title: 'Byte',
      backgroundColor: '#eff7f6',
      webPreferences: { preload: path.join(__dirname, 'preload.cjs'), nodeIntegration: false, contextIsolation: true, sandbox: true, webSecurity: true },
    });
    window.webContents.setWindowOpenHandler(() => ({ action: 'deny' }));
    window.webContents.on('will-navigate', event => event.preventDefault());
    if (process.argv.includes('--smoke-test')) {
      const timer = setTimeout(() => app.exit(1), 15000);
      window.webContents.once('did-finish-load', async () => {
        try {
          const result = await window.webContents.executeJavaScript(`(async () => {
            const info = await window.byte.getAppInfo();
            return { mode: info.mode, isolated: typeof require === 'undefined' && typeof process === 'undefined', heading: document.querySelector('h1')?.textContent };
          })()`);
          if (result.mode !== 'offline-shell' || !result.isolated || result.heading !== 'こんにちは、Byte です。') throw new Error('Smoke assertions failed');
          const switched = await window.webContents.executeJavaScript(`(async () => {
            const select = document.querySelector('select');
            const checkLanguage = async (language, heading) => {
              select.value = language;
              select.dispatchEvent(new Event('change', { bubbles: true }));
              await new Promise(resolve => setTimeout(resolve, 100));
              return document.documentElement.lang === language && document.querySelector('h1')?.textContent === heading;
            };
            return await checkLanguage('en', 'Hello, I’m Byte.') && await checkLanguage('ja', 'こんにちは、Byte です。');
          })()`);
          if (!switched) throw new Error('Language switching failed');
          console.log('Desktop smoke passed: React, validated IPC, isolated renderer, English/Japanese switching.');
          clearTimeout(timer);
          app.exit(0);
        } catch (error) { console.error(error); app.exit(1); }
      });
      window.webContents.once('did-fail-load', () => app.exit(1));
    }
    void window.loadFile(path.join(__dirname, 'index.html'));
  };
  createWindow();
  app.on('activate', () => { if (!BrowserWindow.getAllWindows().length) createWindow(); });
});
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
