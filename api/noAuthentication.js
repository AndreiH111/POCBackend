// api/noAuthentication.js
const express = require('express');
const app = express();

app.get('/noAuth', (req, res) => {
  res.json({ message: 'No Authentication' });
});

module.exports = (req, res) => {
  app(req, res);
};

