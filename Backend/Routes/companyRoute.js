const express = require("express");
const router = express.Router();
const {
  addAddress,
  registerCompany,
  loginCompany,
  getAllCompanies,
  getAddresses,
  getAdvertisements,
  updateCompany,
  postAdvertisement,
} = require("../Controllers/companyController");

router.post("/add-address", addAddress);
router.put("/register", registerCompany);
router.post("/login", loginCompany);
router.get("", getAllCompanies);
router.get("/:companyId/addresses", getAddresses);
router.get("/:companyId/advertisements", getAdvertisements);
router.post("/update", updateCompany);
router.post("/:companyId/advertisement", postAdvertisement);

module.exports = router;
