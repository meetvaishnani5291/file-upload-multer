const express = require("express");
const path = require("path");

require("dotenv").config();

const upload = require("../utils/upload");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static(path.join(__dirname, "..", "public")));
app.use(express.urlencoded({ extended: true }));

app.get("/add-image", (req, res, next) => {
  res.render("addImage");
});

app.post("/add-image", upload.single("image"), (req, res, next) => {
  res.render("addImage");
});

app.get("/", (req, res, next) => {
  res.render("displayImages");
});

app.listen(process.env.PORT, () => {
  console.log("server is runnig on port:" + process.env.PORT);
});
