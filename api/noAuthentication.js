// api/noAuthentication.js
const express = require('express');
const router = express.Router();
const users = require('../data/users');

router.get('/', (req, res) => {

  res.json({ message: 'No authentication route works!', users });
});

module.exports = router;
