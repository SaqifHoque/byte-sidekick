import { contextBridge, ipcRenderer } from 'electron';
import { APP_INFO_CHANNEL, type DesktopAPI } from '../shared/desktop';
const desktop: DesktopAPI = Object.freeze({ getAppInfo: () => ipcRenderer.invoke(APP_INFO_CHANNEL) });
contextBridge.exposeInMainWorld('byte', desktop);
