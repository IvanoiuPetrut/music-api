const express = require("express");
const router = express.Router();
const fs = require("fs");

let db = fs.readFileSync("./db.json");
let dbJSON = JSON.parse(db);

router.get("/currently-playing", (req, res, next) => {
  let options = {
    root: __dirname + "\\songs\\",
    dotfiles: "deny",
    headers: {
      "x-timestamp": Date.now(),
      "x-sent": true,
    },
  };

  let fileName;
  dbJSON.songs.forEach((song) => {
    console.log(song.currentlyPlaying);
    if (song.currentlyPlaying) {
      fileName = song.fileName;
    }
  });

  res.sendFile(fileName, options, (err) => {
    if (err) {
      next(err); //  This will send the error to the error handler
    } else {
      console.log("Sent:", fileName);
    }
  });
});

module.exports = router;
