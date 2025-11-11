// api/noAuthentication.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'No authentication route works!' });
});

module.exports = router;
