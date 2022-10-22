const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).send({
    title: "Song 🎶",
    arttist: "Artist 🎨",
    duration: "Duration ⏱",
  });
});

module.exports = router;
