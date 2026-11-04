import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from '../src/server.js';

let server;
let base;

before(async () => {
  server = createServer();
  await new Promise((resolve) => server.listen(0, resolve));
  base = `http://localhost:${server.address().port}`;
});

after(() => server.close());

test('GET /health returns ok', async () => {
  const res = await fetch(`${base}/health`);
  assert.equal(res.status, 200);
  assert.deepEqual(await res.json(), { status: 'ok' });
});

test('POST /api/quote returns a price breakdown', async () => {
  const res = await fetch(`${base}/api/quote`, {
    method: 'POST',
    body: JSON.stringify({ items: [{ name: 'espresso', price: 10, qty: 1 }] }),
  });
  assert.equal(res.status, 200);
  const body = await res.json();
  assert.equal(body.total, 11.8);
});

test('POST /api/quote returns 400 on a bad order', async () => {
  const res = await fetch(`${base}/api/quote`, { method: 'POST', body: '{"items":[]}' });
  assert.equal(res.status, 400);
});
