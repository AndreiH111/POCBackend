// api/noAuthentication.js
const express = require("express");
const router = express.Router();
const { users } = require("./data/users");
const { activitiesTimeline } = require("./data/timeline");
const { userProfile } = require("./data/userprofile");

router.get("/", (req, res) => {
  res.json({ message: "No authentication route works!", users });
});
router.get("/timeline", (req, res) => {
  res.json({ message: "Timeline Data", activitiesTimeline });
});
router.get("/userprofile", (req, res) => {
  res.json({ message: "User Profile Data", userProfile });
});

module.exports = router;
