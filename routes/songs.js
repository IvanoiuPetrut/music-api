const express = require("express");
const router = express.Router();
const fs = require("fs");

router.get("/currently-playing", (req, res, next) => {
  let options = {
    root: __dirname + "\\songs\\",
    dotfiles: "deny",
    headers: {
      "x-timestamp": Date.now(),
      "x-sent": true,
    },
  };

  let fileName = "kalif_fata-care-ma-dat-gata.mp3"; // ! This needs to be dynamic => req.params.name
  res.sendFile(fileName, options, (err) => {
    if (err) {
      next(err); //  This will send the error to the error handler
    } else {
      console.log("Sent:", fileName);
    }
  });
});

module.exports = router;
