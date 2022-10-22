const app = require("express")();
const PORT = 8080;
const cors = require("cors");

// * Middleware

app.use(cors());

// * Import the routes

const songRoute = require("./routes/songs");
app.use("/song", songRoute);

// * Routes

app.get("/", (req, res) => {
  res.status(200).send("Home 🏠");
});

// * Start the server

app.listen(PORT, () => {
  console.log(`Server it's alive on http://localhost:${PORT}`);
});
