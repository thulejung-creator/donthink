import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, writeFile, readFile, rm, access } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { run } from './external-review.mjs';

test('preview, explicit sending, failure handling, and output protection', async () => {
  const root = await mkdtemp(join(tmpdir(), 'donthink-'));
  const input = join(root, 'packet.txt'), out = join(root, 'review.json');
  const args = ['--input', input, '--out', out, '--base-url', 'https://api.deepseek.com', '--model', 'test-model'];
  let calls = 0;
  const env = { DEEPSEEK_API_KEY: 'test-key' };
  const fetcher = async (url, opts) => {
    calls++;
    assert.equal(url, 'https://api.deepseek.com/chat/completions');
    assert.equal(opts.redirect, 'error');
    assert.equal(opts.headers.Authorization, 'Bearer test-key');
    const body = JSON.parse(opts.body);
    assert.equal(body.messages[1].content, '检查函数：空输入应返回 []');
    assert.equal(body.model, 'test-model');
    return { ok: true, json: async () => ({ model: 'test-model', choices: [{ finish_reason: 'stop', message: { content: 'No findings; limited to supplied code.' } }] }) };
  };
  try {
    await writeFile(input, '检查函数：空输入应返回 []');
    assert.equal((await run(args, { env: {}, fetcher })).status, 'preview');
    assert.equal(calls, 0);
    await assert.rejects(run([...args, '--send'], { env: {}, fetcher }), /Set DEEPSEEK/);
    await run([...args, '--send'], { env, fetcher });
    const saved = JSON.parse(await readFile(out, 'utf8'));
    assert.equal(saved.status, 'reviewed');
    assert.equal(saved.packet_sha256.length, 64);
    assert.equal(calls, 1);
    await assert.rejects(run([...args, '--send'], { env, fetcher }), /EEXIST/);
    assert.equal(calls, 1);
    await rm(out);
    for (const response of [
      { ok: false, status: 401 },
      { ok: true, json: async () => ({ choices: [{ finish_reason: 'length', message: { content: 'truncated' } }] }) },
      { ok: true, json: async () => { throw new Error('malformed'); } },
      { ok: true, json: async () => ({}) },
    ]) {
      await assert.rejects(run([...args, '--send'], { env, fetcher: async () => response }));
      await assert.rejects(access(out));
    }
    await assert.rejects(run([...args, '--send'], { env, fetcher: async () => { throw new Error('secret'); } }), /not retried/);
    await assert.rejects(run([...args, '--base-url', 'http://example.com'], { env, fetcher }));
    await writeFile(input, '');
    await assert.rejects(run(args), /Packet/);
    await writeFile(input, Buffer.from([255]));
    await assert.rejects(run(args));
  } finally { await rm(root, { recursive: true, force: true }); }
});
