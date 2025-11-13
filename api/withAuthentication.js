// api/withAuthentication.js
const express = require('express');
const router = express.Router();
const users = require('../data/users');
const axios = require('axios');

// Environment variables (never hardcode secrets)
const TOKEN_URL = process.env.OAUTH_TOKEN_URL;  // e.g. 'https://your-auth-server.com/oauth/token'
const CLIENT_ID = process.env.OAUTH_CLIENT_ID;
const CLIENT_SECRET = process.env.OAUTH_CLIENT_SECRET;

// Middleware to verify OAuth2 token
async function verifyAccessToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing or invalid Authorization header' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // You can validate token with your OAuth server’s introspection endpoint if available
    const response = await axios.post(
      TOKEN_URL + '/introspect', // or your specific introspection endpoint
      new URLSearchParams({ token }),
      {
        auth: {
          username: CLIENT_ID,
          password: CLIENT_SECRET
        }
      }
    );

    if (!response.data.active) {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }

    // Attach token info for downstream routes
    req.user = response.data;
    next();

  } catch (err) {
    console.error('Token verification failed:', err.message);
    return res.status(403).json({ error: 'Token verification failed' });
  }
}

// Protected route
router.get('/', verifyAccessToken, (req, res) => {
  res.json({
    message: 'With authentication route works!',
    users,
    authenticatedClient: req.user.client_id || 'unknown-client'
  });
});

module.exports = router;
