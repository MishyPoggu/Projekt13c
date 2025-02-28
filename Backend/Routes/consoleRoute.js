const express = require("express");
const {
  getAllConsoles,
  getConsole,
  addConsole,
  addConsoles,
  removeConsole,
  updateConsole,
} = require("../Controllers/consoleController");

const router = express.Router();

router.get("", getAllConsoles);
router.get("/get", getConsole);
router.put("/add", addConsole);
router.put("/addMultiple", addConsoles);
router.delete("/remove", removeConsole);
router.patch("/update", updateConsole);

module.exports = router;
