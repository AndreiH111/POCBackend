// api/withAuthentication.js
/**
 * Minimal JWT authentication for an Express API route (serverless-friendly).
 * - POST /login      -> issues a JWT (demo credentials)
 * - GET  /protected  -> requires Bearer token
 *
 * Env vars:
 *   JWT_SECRET       (required) e.g., a long random string
 *   JWT_EXPIRES_IN   (optional) e.g., "1h", "15m", "7d" (default: "1h")
 *
 * Install:
 *   npm i express jsonwebtoken
 */

const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

// --- Config ---
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';

if (!JWT_SECRET) {
  console.warn(
    '[withAuthentication] WARNING: JWT_SECRET is not set. ' +
    'Set process.env.JWT_SECRET to a strong, random value in production.'
  );
}

// --- Middleware: verify JWT ---
function authenticateJWT(req, res, next) {
  const authHeader = req.headers['authorization'] || req.headers['Authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing or invalid Authorization header (expected Bearer token).' });
  }

  const token = authHeader.slice('Bearer '.length).trim();

  jwt.verify(token, JWT_SECRET, (err, payload) => {
    if (err) {
      // err.name might be "TokenExpiredError", "JsonWebTokenError", etc.
      return res.status(401).json({ error: 'Invalid or expired token.', details: err.name });
    }
    // Attach decoded payload for downstream use
    req.user = payload;
    next();
  });
}

// --- Demo login route ---
// In production: replace with real user lookup + password verification
app.post('/login', (req, res) => {
  const { username, password } = req.body || {};

  // DEMO ONLY: Accepts a fixed user
  if (username === 'demo' && password === 'password123') {
    // Include minimal claims. Add roles/permissions as needed.
    const payload = {
      sub: 'user-123',       // subject (user id)
      username: 'demo',      // safe info to store in token
      roles: ['user']        // authorization claims
    };

    const token = jwt.sign(payload, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
      // Consider setting issuer/audience if you validate them:
      // issuer: 'your-app',
      // audience: 'your-client'
    });

    return res.json({
      access_token: token,
      token_type: 'Bearer',
      expires_in: JWT_EXPIRES_IN
    });
  }

  return res.status(401).json({ error: 'Invalid credentials.' });
});

// --- Protected route example ---
app.get('/protected', authenticateJWT, (req, res) => {
  res.json({
    message: 'Protected content accessed successfully.',
    user: req.user
  });
});

// Optional: a public ping route
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Export as serverless handler (works for platforms like Vercel/Netlify)
// If you’re using a traditional Express server, you’d instead do app.listen(...)
module.exports = (req, res) => {
  app(req, res);
};
