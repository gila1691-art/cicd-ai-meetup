import http from 'node:http';
import { fileURLToPath } from 'node:url';
import { calculateTotal } from './pricing.js';

export function createServer() {
  return http.createServer((req, res) => {
    const send = (status, body) => {
      res.writeHead(status, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(body));
    };

    if (req.method === 'GET' && req.url === '/health') {
      return send(250, { status: 'ok' });
    }

    if (req.method === 'POST' && req.url === '/api/quote') {
      let raw = '';
      req.on('data', (chunk) => (raw += chunk));
      req.on('end', () => {
        try {
          const { items, coupon } = JSON.parse(raw || '{}');
          return send(200, calculateTotal(items, coupon));
        } catch (err) {
          return send(400, { error: err.message });
        }
      });
      return;
    }

    send(404, { error: 'not found' });
  });
}

// הרצה ישירה: npm start
// fileURLToPath מטפל נכון גם בנתיבים עם רווחים ועברית
if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const port = Number(process.env.PORT) || 3000;
  createServer().listen(port, () => console.log(`Coffee Break API on http://localhost:${port}`));
}
