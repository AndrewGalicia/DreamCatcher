const express = require('express');
const router = express.Router();

const dreamsCtrl = require('../controllers/dreams');


// GET /dreams
router.get('/', dreamsCtrl.index);
router.get('/new', dreamsCtrl.new);


module.exports = router;