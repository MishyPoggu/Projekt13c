const express = require("express");
const { findAllTokens } = require("../Controllers/tokenController");

const router = express.Router();

router.get("", findAllTokens);

module.exports = router;
