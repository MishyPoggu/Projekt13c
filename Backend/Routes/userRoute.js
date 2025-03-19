const express = require("express");
const {
  getAllUsers,
  registerUser,
  loginUser,
  makeAdmin,
  removeUser,
  updateUser,
  getUser,
  addMachineToUser, 
  getUserMachines, 
  removeMachineFromUser
} = require("../Controllers/userController");


const router = express.Router();

router.get("", getAllUsers);
router.get("/get", getUser);
router.put("/register", registerUser);
router.post("/login", loginUser);
router.delete("/remove", removeUser);
router.post("/grant-admin", makeAdmin);
router.post("/update", updateUser);
router.get("/machines", getUserMachines);
router.post("/machines/add", addMachineToUser);
router.delete("/machines/remove", removeMachineFromUser);

module.exports = router;
