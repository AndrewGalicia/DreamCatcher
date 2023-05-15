const express = require('express');
const router = express.Router();

const profilesCtrl = require('../controllers/profiles');


// GET /profile/show
router.get('/:id', profilesCtrl.show);
router.get('/new', profilesCtrl.new);



module.exports = router;