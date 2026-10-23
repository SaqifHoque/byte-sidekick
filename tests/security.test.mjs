import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { build } from 'esbuild';
import vm from 'node:vm';

test('main denies untrusted IPC, navigation, popups and permissions', async () => {
  const output = await build({ entryPoints: ['src/main/index.ts'], bundle: true, write: false, platform: 'node', format: 'cjs', external: ['electron'] });
  const handlers = {}; const windows = []; const listeners = {};
  const permissions = {};
  class BrowserWindow {
    constructor(options) {
      this.options = options;
      this.webContents = { setWindowOpenHandler: handler => { this.popup = handler; }, on: (name, handler) => { listeners[name] = handler; } };
      windows.push(this);
    }
    loadFile() { return Promise.resolve(); }
  }
  const app = { whenReady: () => Promise.resolve(), on() {}, getVersion: () => '0.1.0' };
  const electron = { app, BrowserWindow, ipcMain: { handle: (name, handler) => { handlers[name] = handler; } }, session: { defaultSession: {
    setPermissionRequestHandler: handler => { permissions.request = handler; },
    setPermissionCheckHandler: handler => { permissions.check = handler; },
  } } };
  vm.runInNewContext(output.outputFiles[0].text, {
    require: name => name === 'electron' ? electron : name === 'node:path' ? path : url,
    __dirname: '/app/dist', process: { platform: 'darwin', argv: [] }, console,
  });
  await new Promise(resolve => setImmediate(resolve));
  assert.equal(windows.length, 1);
  assert.equal(windows[0].options.webPreferences.sandbox, true);
  assert.equal(windows[0].options.webPreferences.nodeIntegration, false);
  assert.equal(windows[0].options.webPreferences.contextIsolation, true);
  assert.equal(windows[0].popup().action, 'deny');
  let prevented = false;
  listeners['will-navigate']({ preventDefault: () => { prevented = true; } });
  assert.equal(prevented, true);
  assert.equal(permissions.check(), false);
  permissions.request(null, 'media', allowed => assert.equal(allowed, false));
  const frame = { url: 'file:///app/dist/index.html' };
  const sender = { mainFrame: frame };
  assert.equal(handlers['byte:app-info']({ sender, senderFrame: frame }).mode, 'offline-shell');
  assert.throws(() => handlers['byte:app-info']({ sender, senderFrame: { url: frame.url } }), /Untrusted/);
  frame.url = 'https://untrusted.invalid';
  assert.throws(() => handlers['byte:app-info']({ sender, senderFrame: frame }), /Untrusted/);
});
import path from 'node:path';
import * as url from 'node:url';

test('renderer CSP forbids network and inline scripts', async () => {
  const html = await readFile('src/renderer/index.html', 'utf8');
  assert.match(html, /connect-src 'none'/);
  assert.match(html, /script-src 'self'/);
  assert.doesNotMatch(html, /unsafe-inline|unsafe-eval/);
});
