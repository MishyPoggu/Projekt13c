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
  getCompanyById,
  addMachineToCompany,
  getCompanyMachines,
  removeMachineFromCompany,
} = require("../Controllers/companyController");

router.post("/add-address", addAddress);
router.put("/register", registerCompany);
router.post("/login", loginCompany);
router.get("", getAllCompanies);
router.get("/:companyId/addresses", getAddresses);
router.get("/:companyId/advertisements", getAdvertisements);
router.post("/update", updateCompany);
router.post("/:companyId/advertisement", postAdvertisement);
router.get("/:companyId", getCompanyById);
router.post("/:companyId/machines/add", addMachineToCompany);
router.get("/:companyId/machines", getCompanyMachines);
router.delete("/:companyId/machines/remove", removeMachineFromCompany);

module.exports = router;