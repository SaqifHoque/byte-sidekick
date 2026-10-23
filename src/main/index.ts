import { app, BrowserWindow, session } from 'electron';
import path from 'node:path';

app.whenReady().then(() => {
  session.defaultSession.setPermissionRequestHandler((_contents, _permission, callback) => callback(false));
  session.defaultSession.setPermissionCheckHandler(() => false);
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
