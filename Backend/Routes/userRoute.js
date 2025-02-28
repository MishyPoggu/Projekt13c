const express = require("express");
const {
  getAllUsers,
  registerUser,
  loginUser,
  removeUser,
} = require("../Controllers/userController");

const router = express.Router();

router.get("", getAllUsers);
router.put("/register", registerUser);
router.post("/login", loginUser);
router.delete("/remove", removeUser);

module.exports = router;
