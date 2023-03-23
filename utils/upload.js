const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, next) {
    next(null, path.join(__dirname, "..", "public", "images"));
  },
  filename: (req, file, next) => {
    next(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1000 * 1000 },
  fileFilter: (req, file, next) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      next(null, true);
    } else {
      return next(null, false);
    }
  },
});

module.exports = upload;
