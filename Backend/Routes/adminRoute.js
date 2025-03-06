const express = require("express");
const {
  getAllAdmins,
  registerAdmin,
  loginAdmin,
  removeAdmin,
} = require("../Controllers/adminController");

const router = express.Router();

router.get("", getAllAdmins);
router.put("/register", registerAdmin);
router.post("/login", loginAdmin);
router.delete("/remove", removeAdmin);

module.exports = router;
