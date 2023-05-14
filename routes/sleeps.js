const express = require('express');
const router = express.Router();
const sleepCtrl = require('../controllers/sleeps');
// const ensureLoggedIn = require('../config/ensureLoggedIn');

// GET /movies
router.get('/', sleepCtrl.index);

module.exports = router;