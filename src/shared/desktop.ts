export const APP_INFO_CHANNEL = 'byte:app-info';
export interface AppInfo { version: string; platform: string; mode: 'offline-shell' }
export interface DesktopAPI { getAppInfo(): Promise<AppInfo> }
