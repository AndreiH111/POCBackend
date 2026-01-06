// api/noAuthentication.js
const express = require("express");
const router = express.Router();
const users = require("./data/users");
const activitiesTimeline = require("./data/timeline");

router.get("/", (req, res) => {
  res.json({ message: "No authentication route works!", users });
});
router.get("/timeline", (req, res) => {
  res.json({ message: "Timeline Data", activitiesTimeline });
});

module.exports = router;
