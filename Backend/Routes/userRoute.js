const express = require("express");
const {
  getAllUsers,
  registerUser,
  loginUser,
  makeAdmin,
  removeUser,
} = require("../Controllers/userController");

const router = express.Router();

router.get("", getAllUsers);
router.put("/register", registerUser);
router.post("/login", loginUser);
router.delete("/remove", removeUser);
router.post("/grant-admin", makeAdmin);

module.exports = router;
