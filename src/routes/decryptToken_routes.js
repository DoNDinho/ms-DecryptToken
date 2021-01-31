'use strict';
const express = require('express');
const router = express.Router();
const decryptTokenController = require('../controllers/decryptToken_controller');

// Metodo para desencriptar token
router.get('/token/:encrypted_token/decrypt', decryptTokenController.token);

module.exports = router;
