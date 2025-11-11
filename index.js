
const express = require('express');
const app = express();

app.get('/hello', (req, res) => {
  res.json({ message: 'Hello from Express API!' });
});

// Import route modules
const noAuthentication = require('./api/noAuthentication');

// Use routes with base paths
app.use('/api/noAuth', noAuthentication);

module.exports = app;