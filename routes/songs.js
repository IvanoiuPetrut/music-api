const express = require("express");
const router = express.Router();
const fs = require("fs");

let db = fs.readFileSync("./db.json");
let dbJSON = JSON.parse(db);

let songs = [
  {
    title: "Gone",
    artist: "Puya",
    fileName: "puya_gone.mp3",
    currentlyPlaying: true,
    duration: 232,
    currentSecond: 0,
  },
  {
    title: "Fata care m-a dat gata",
    artist: "Kalif",
    fileName: "kalif_fata-care-ma-dat-gata.mp3",
    currentlyPlaying: false,
    duration: 222,
    currentSecond: 0,
  },
];

setInterval(() => {
  for (song of songs) {
    if (song.currentlyPlaying) {
      if (song.currentSecond < song.duration) {
        song.currentSecond++;
        console.log(song.title + song.currentSecond);
      } else {
        song.currentSecond = 0;
      }
    }
  }
}, 1000);

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
  for (song of songs) {
    if (song.currentlyPlaying) {
      fileName = song.fileName;
    }
  }

  res.status(200).sendFile(fileName, options, (err) => {
    if (err) {
      next(err);
    } else {
      console.log("Sent:", fileName);
    }
  });
});

router.get("/currently-playing/details", (req, res) => {
  for (song of songs) {
    if (song.currentlyPlaying) {
      res.status(200).json(song);
    }
  }
});

router.post("/currently-playing", (req, res) => {
  const { songTitle } = req.body;
  let songFound = false;

  for (song of songs) {
    if (song.title === songTitle) {
      song.currentlyPlaying = true;
      songFound = true;
    } else {
      song.currentlyPlaying = false;
    }
  }

  if (songFound) {
    res.status(200).send("The current playing song is now: " + songTitle);
  } else {
    res.status(404).send("Song not found");
  }
});

module.exports = router;
