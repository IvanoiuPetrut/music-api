const app = require("express")();
const PORT = 8080;

// * Start the server
app.listen(PORT, () => {
  console.log(`Server it's alive on http://localhost:${PORT}`);
});
