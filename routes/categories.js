const express = require('express');
const router = express.Router();
const category = require('../models/categories');

router.post('/categories', category);

module.exports = router;