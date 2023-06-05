const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.get("/", (req, res) => {
  res.send("Online Shopping");
});

// Start the server
const port = 9090;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
