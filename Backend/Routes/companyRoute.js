const express = require("express");
const {
  getAllCompanies,
  registerCompany,
  loginCompany,
  addAddress,
  postAdvertisement,
} = require("../Controllers/companyController");
const upload = require("../Middleware/uploadImage");

const router = express.Router();

router.get("", getAllCompanies);
router.put("/register", registerCompany);
router.post("/login", loginCompany);
router.post("/add-address/:companyId", addAddress);
router.post("/post-ad", upload.single("image"), postAdvertisement);

module.exports = router;
