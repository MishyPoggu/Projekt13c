const express = require("express");
const router = express.Router();
const companyController = require("../Controllers/companyController");

router.post("/companies/add-address", companyController.addAddress);
router.post("/companies/register", companyController.registerCompany);
router.post("/companies/login", companyController.loginCompany);
router.get("/companies", companyController.getAllCompanies);
router.get("/companies/:companyId/addresses", companyController.getAddresses);
router.get("/companies/:companyId/advertisements", companyController.getAdvertisements);

module.exports = router;
