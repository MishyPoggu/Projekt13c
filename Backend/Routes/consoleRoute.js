const express = require('express');
const router = express.Router();
const consoleController = require('../Controllers/consoleController');

router.get('', consoleController.getAllConsoles);
router.get('/get', consoleController.getConsole);
router.put('/add', consoleController.addConsole);
router.put('/addMultiple', consoleController.addConsoles);
router.delete('/remove', consoleController.removeConsole);
router.patch('/update', consoleController.updateConsole);

module.exports = router;
