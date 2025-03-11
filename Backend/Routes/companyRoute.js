const express = require("express");
const router = express.Router();
const {
  addAddress,
  registerCompany,
  loginCompany,
  getAllCompanies,
  getAddresses,
  getAdvertisements,
} = require("../Controllers/companyController");

router.post("/add-address", addAddress);
router.post("/register", registerCompany);
router.post("/login", loginCompany);
router.get("", getAllCompanies);
router.get("/:companyId/addresses", getAddresses);
router.get("/:companyId/advertisements", getAdvertisements);

module.exports = router;
