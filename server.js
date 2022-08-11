import express from "express";
import cors from "cors";
import "dotenv/config.js";
import fs from "fs";
import multer from "multer";

const upload = multer({ dest: "uploads/" });
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/public", express.static(process.cwd() + "/public"));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

app.post("/api/fileanalyse", upload.single("upfile"), (req, res) => {
  console.log(req.file);
  // const { file } = req.body;
  // const { size } = file;
  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size,
  });
});

const port = 8080;
app.listen(process.env.PORT || port, function () {
  console.log("Your app is listening on port " + process.env.PORT || port);
});
