const express = require("express");
const path = require("path");
const app = express();
const PORT = 3000;

app.get("/", (request, response) => {
  response.sendFile(path.resolve(__dirname, "build/index.html"));
});
app.get("/*", (req, res) => {
  console.log("path: ", req.path);
  const fullPath = path.resolve(__dirname, `build/${req.path}`);
  console.log("fullpath: ", fullPath);

  res.sendFile(fullPath);
});

app.listen(PORT, () => {
  console.log(`Listening ${PORT}`);
});
