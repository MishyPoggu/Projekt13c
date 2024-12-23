const express = require('express');
const router = express.Router();
const tokenController = require('../Controllers/tokenController');

router.get('', tokenController.findAllTokens);

module.exports = router;
