// api/noAuthentication.js
const express = require('express');
const router = express.Router();
// const users = require('../data/users');

router.get('/', (req, res) => {
const users = [
  {
    id: 1,
    name: 'Meguiso Keith',
    email: 'keith.meguiso@takeda.com',
    role: 'Admin',
    active: true
  },
  {
    id: 2,
    name: 'Mejia Ma. Angela',
    email: 'ma-angela.mejia@takeda.com',
    role: 'User',
    active: false
  },
  {
    id: 3,
    name: 'Baranco, Lee Ann',
    email: 'lee-ann.baranco@takeda.com',
    role: 'Editor',
    active: true
  },
  {
    id: 4,
    name: 'Infante Rowen',
    email: 'rowen.infante@takeda.com',
    role: 'Editor',
    active: true
  },
    {
    id: 5,
    name: 'Rilan Michael Angelo',
    email: 'michael-angelo.rilan@takeda.com',
    role: 'Editor',
    active: true
  }
];
  res.json({ message: 'No authentication route works!', users });
});

module.exports = router;
