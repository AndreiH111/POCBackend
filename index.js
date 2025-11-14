
const express = require('express');
const app = express();

app.get('/hello', (req, res) => {
  res.json({ message: 'Hello from Express API!' });
});

// Import route modules
const noAuthentication = require('./api/noAuthentication');
const withAuthentication = require('./api/withAuthentication');
const auth = require('./api/auth');

// Use routes with base paths
app.use('/api/noAuth', noAuthentication);
app.use('/api/protected', withAuthentication);
app.use('/api/auth', auth);

module.exports = app;