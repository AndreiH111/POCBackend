// api/noAuthentication.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const users = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: 'Admin',
      active: true
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      role: 'User',
      active: false
    },
    {
      id: 3,
      name: 'Alex Johnson',
      email: 'alex.johnson@example.com',
      role: 'Editor',
      active: true
    }
  ];

  res.json({ message: 'No authentication route works!', users });
});

module.exports = router;
