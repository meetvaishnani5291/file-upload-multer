const express = require("express");
const fs = require("fs");
const { MulterError } = require("multer");
const path = require("path");

require("dotenv").config();

const upload = require("../file-upload-multer/utils/upload");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.get("/add-image", (req, res, next) => {
  res.render("addImage", { message: undefined });
});

app.post("/add-image", upload.single("image"), (req, res, next) => {
  let images;
  if (req.file === undefined) {
    return res.render("addImage", { message: "only png,jpg,jpeg allowed" });
  }
  const newImage = { name: req.file.filename, title: req.body.title };
  let fileContent = fs.readFileSync(path.join("assets", "images.json"));
  if (fileContent === " ") {
    images = [];
  } else {
    images = JSON.parse(fileContent);
  }
  images.push(newImage);
  fs.writeFileSync(path.join("assets", "images.json"), JSON.stringify(images));
  res.render("addImage", { message: "Image added successfully." });
});

app.get("/", (req, res, next) => {
  let fileContent = fs.readFileSync(path.join("assets", "images.json"));
  let images;
  if (fileContent === " ") {
    images = [];
  } else {
    images = JSON.parse(fileContent);
  }
  res.render("displayImages", { images });
});

app.use((error, req, res, next) => {
  if (error instanceof MulterError) {
    res.render("addImage", { message: "max size should be 5 mb" });
  } else {
    res.redirect("/");
  }
});

app.listen(process.env.PORT, () => {
  console.log("server is runnig on port:" + process.env.PORT);
});
