const express = require('express');
const router = express.Router();
const userController = require('../Controllers/userController');

router.get('', userController.getAllUsers);
router.put('/register', userController.registerUser);

module.exports = router;
