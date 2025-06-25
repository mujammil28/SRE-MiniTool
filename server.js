const express = require("express");
const multer = require("multer");
const fs = require("fs");
const cors = require("cors");
const path = require("path");
const parseLog = require("./parser");

const app = express();
app.use(cors());
app.use(express.static("public"));

const upload = multer({ dest: "uploads/" });

app.post("/upload", upload.single("logFile"), (req, res) => {
  const filePath = req.file.path;

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) return res.status(500).send("Error reading log file");

    const result = parseLog(data);
    fs.unlinkSync(filePath); // cleanup uploaded file

    res.json(result);
  });
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
