const express = require('express');
const router = express.Router();
const consoleController = require('../Controllers/consoleController');

router.get('', consoleController.getAllConsoles);
router.put('/add', consoleController.addConsole);
router.put('/addMultiple', consoleController.addConsoles);
router.delete('/remove', consoleController.removeConsole);

module.exports = router;
