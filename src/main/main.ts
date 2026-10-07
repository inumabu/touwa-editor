import { app, BrowserWindow, session, shell } from 'electron';
import path from 'node:path';
import { registerIpc } from './ipc/register-ipc';

function createWindow(): void {
  const window = new BrowserWindow({ width: 1400, height: 900, minWidth: 900, minHeight: 600, backgroundColor: '#10141c', webPreferences: { preload: path.join(__dirname, '../preload/preload.mjs'), contextIsolation: true, nodeIntegration: false, sandbox: true } });
  window.webContents.setWindowOpenHandler(({ url }) => { if (url.startsWith('https://')) void shell.openExternal(url); return { action: 'deny' }; });
  void window.loadURL(process.env.ELECTRON_RENDERER_URL ?? `file://${path.join(__dirname, '../renderer/index.html')}`);
}
app.whenReady().then(() => { session.defaultSession.setPermissionRequestHandler((_webContents, _permission, callback) => callback(false)); registerIpc(); createWindow(); app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) createWindow(); }); });
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
