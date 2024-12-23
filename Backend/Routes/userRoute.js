const express = require('express');
const router = express.Router();
const userController = require('../Controllers/userController');

router.get('', userController.getAllUsers);
router.put('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.delete('/remove', userController.removeUser);

module.exports = router;
