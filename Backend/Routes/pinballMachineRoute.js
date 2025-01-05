const express = require('express');
const router = express.Router();
const pinballMachineController = require('../Controllers/pinballMachineController');

router.get('', pinballMachineController.getAllPinballMachines);
router.get('/get', pinballMachineController.getPinballMachine);
router.put('/add', pinballMachineController.addPinballMachine);
router.put('/addMultiple', pinballMachineController.addPinballMachines);
router.delete('/remove', pinballMachineController.removePinballMachine);
router.patch('/update', pinballMachineController.updatePinballMachine);

module.exports = router;
