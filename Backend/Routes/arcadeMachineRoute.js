const express = require("express");
const {
  getAllArcadeMachines,
  getArcadeMachine,
  addArcadeMachine,
  addArcadeMachines,
  removeArcadeMachine,
  updateArcadeMachine,
} = require("../Controllers/arcadeMachineController");

const router = express.Router();

router.get("", getAllArcadeMachines);
router.get("/get", getArcadeMachine);
router.put("/add", addArcadeMachine);
router.put("/addMultiple", addArcadeMachines);
router.delete("/remove", removeArcadeMachine);
router.patch("/update", updateArcadeMachine);

module.exports = router;
