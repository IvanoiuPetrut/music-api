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

  // ! Create a fucntion in dbHelper.js to get the current song
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

router.post("/currently-playing", (req, res) => {
  // * Toggle the currentlyPlaying property of the song
  // ! Create a fucntion in dbHelper.js to toggle the currentPlaying property
  // ! Create a functions that parses the db.json and can take functions as arguments to modify the data before saving it
  const { songTitle } = req.body;
  let songFound = false;
  dbJSON.songs.forEach((song) => {
    console.log(song.currentlyPlaying);
    if (song.currentlyPlaying) {
      dbJSON.songs[dbJSON.songs.indexOf(song)].currentlyPlaying = false;
    }
    if (song.title === songTitle) {
      dbJSON.songs[dbJSON.songs.indexOf(song)].currentlyPlaying = true;
      songFound = true;
    }
    fs.writeFileSync("./db.json", JSON.stringify(dbJSON));
  });

  if (songFound) {
    res.status(200).send("The current playing song is now: " + songTitle);
  } else {
    res.status(404).send("Song not found");
  }
  // res.status(200).send("The current playin song is now: " + songTitle);
});

module.exports = router;
