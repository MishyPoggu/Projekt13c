const multer = require("multer");
const path = require("path");

// Ide menti
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../Uploads/Images"));
  },
  filename: function (req, file, cb) {
    const uniqueName = uuidv4() + path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

// Kiszűri a nem-kép típusokat
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only images are allowed"), false);
  }
};

// Feltöltés
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Csak 5MB-ot engedjen maximum
  fileFilter: fileFilter,
});

module.exports = upload;
