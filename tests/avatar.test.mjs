import { test } from 'node:test';
import assert from 'node:assert/strict';
import { build } from 'esbuild';
import vm from 'node:vm';

test('avatar contract rejects unknown expressions and bounds untrusted intensity', async () => {
  const result = await build({ entryPoints: ['src/renderer/avatar/state.ts'], bundle: true, write: false, platform: 'node', format: 'cjs' });
  const module = { exports: {} };
  vm.runInNewContext(result.outputFiles[0].text, { module, exports: module.exports });
  const { expression, expressions, intensity } = module.exports;
  for (const name of expressions) assert.equal(expression(name), name);
  for (const value of ['execute', '__proto__', null, {}, undefined]) assert.equal(expression(value), 'neutral');
  assert.equal(intensity(-10), 0);
  assert.equal(intensity(50), 1);
  assert.equal(intensity(NaN), 0.5);
  assert.equal(intensity(Infinity), 0.5);
  assert.equal(intensity(0.4), 0.4);
});
