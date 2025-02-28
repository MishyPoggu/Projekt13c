const express = require("express");
const {
  getAllPinballMachines,
  getPinballMachine,
  addPinballMachine,
  addPinballMachines,
  removePinballMachine,
  updatePinballMachine,
} = require("../Controllers/pinballMachineController");

const router = express.Router();

router.get("", getAllPinballMachines);
router.get("/get", getPinballMachine);
router.put("/add", addPinballMachine);
router.put("/addMultiple", addPinballMachines);
router.delete("/remove", removePinballMachine);
router.patch("/update", updatePinballMachine);

module.exports = router;
