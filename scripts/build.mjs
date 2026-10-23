import { build } from 'esbuild';
import { mkdir, copyFile } from 'node:fs/promises';
await mkdir('dist', { recursive: true });
await Promise.all([
  build({ entryPoints: ['src/main/index.ts'], outfile: 'dist/main.cjs', bundle: true, platform: 'node', external: ['electron'] }),
  build({ entryPoints: ['src/preload/index.ts'], outfile: 'dist/preload.cjs', bundle: true, platform: 'node', external: ['electron'] }),
  build({ entryPoints: ['src/renderer/index.tsx'], outfile: 'dist/renderer.js', bundle: true, platform: 'browser' }),
  copyFile('src/renderer/index.html', 'dist/index.html'),
]);
