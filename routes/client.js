const express = require('express');
const router = express.Router();
const Client = require('../controllers/client');

router.post('/signup', Client.signup);

router.post('/login', Client.login);

module.exports = router;