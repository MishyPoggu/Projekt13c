const express = require('express');
const router = express.Router();
const arcadeMachineController = require('../Controllers/arcadeMachineController');

router.get('', arcadeMachineController.getAllArcadeMachines);
router.get('/get', arcadeMachineController.getArcadeMachine);
router.put('/add', arcadeMachineController.addArcadeMachine);
router.put('/addMultiple', arcadeMachineController.addArcadeMachines);
router.delete('/remove', arcadeMachineController.removeArcadeMachine);
router.patch('/update', arcadeMachineController.updateArcadeMachine);

module.exports = router;
