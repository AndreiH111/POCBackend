// api/withAuthentication.js
const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const users = require('./data/users');
const { verifyToken } = require('./middleware/authMiddleware');

router.use(bodyParser.json());

/**
 * Protected route - requires JWT token
 * GET /api/protected/
 * Headers: Authorization: Bearer <token>
 */
router.get('/', verifyToken, (req, res) => {
  res.json({
    message: 'Protected route accessed successfully!',
    authenticatedUser: req.user,
    users
  });
});

/**
 * Get current user info from JWT token
 * GET /api/protected/me
 * Headers: Authorization: Bearer <token>
 */
router.get('/me', verifyToken, (req, res) => {
  res.json({
    message: 'User info retrieved',
    user: req.user
  });
});

module.exports = router;
