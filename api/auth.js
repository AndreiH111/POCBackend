// api/auth.js
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const router = express.Router();
const users = require('./data/users');
const { JWT_SECRET } = require('./middleware/authMiddleware');

router.use(bodyParser.json());

/**
 * Login endpoint - returns JWT token
 * POST /api/auth/login
 * Body: { email, password }
 */
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Find user by email
    const user = users.find(u => u.email === email);

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // In a real application, verify password with bcrypt
    // For POC, we'll do a simple check
    // const passwordMatch = await bcrypt.compare(password, user.passwordHash);
    const passwordMatch = password === 'password123'; // Simple check for POC

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Login failed', details: error.message });
  }
});

/**
 * Register endpoint - creates a new user with JWT token
 * POST /api/auth/register
 * Body: { name, email, password, role }
 */
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required' });
    }

    // Check if user already exists
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      return res.status(409).json({ error: 'User already exists' });
    }

    // Hash password (simplified for POC)
    // const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = {
      id: Math.max(...users.map(u => u.id)) + 1,
      name,
      email,
      role: role || 'User',
      active: true
      // In production, store hashedPassword instead of plaintext
    };

    users.push(newUser);

    // Generate JWT token
    const token = jwt.sign(
      {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        role: newUser.role
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      message: 'Registration successful',
      token,
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        role: newUser.role
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed', details: error.message });
  }
});

/**
 * Verify token endpoint
 * GET /api/auth/verify
 * Headers: Authorization: Bearer <token>
 */
router.get('/verify', (req, res) => {
  const { verifyToken } = require('./middleware/authMiddleware');
  verifyToken(req, res, () => {
    res.json({
      message: 'Token is valid',
      user: req.user
    });
  });
});

module.exports = router;
