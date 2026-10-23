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
    void window.loadFile(path.join(__dirname, 'index.html'));
  };
  createWindow();
  app.on('activate', () => { if (!BrowserWindow.getAllWindows().length) createWindow(); });
});
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
