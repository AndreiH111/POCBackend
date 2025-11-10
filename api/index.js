
const express = require('express');
const app = express();

app.get('/hello', (req, res) => {
  res.json({ message: 'Hello from Express API!' });
});

module.exports = (req, res) => {
  app(req, res);
};
