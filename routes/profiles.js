const express = require('express');
const router = express.Router();
const profilesCtrl = require('../controllers/profiles');
const sleepCtrl = require('../controllers/sleeps');


// GET /profile/show


// Route to display the form for creating a new profile
router.get('/new', profilesCtrl.newProfile);

// Route to handle creating a new profile
router.post('/', profilesCtrl.createProfile);

// Route to display the user's profile
router.get('/:id', profilesCtrl.show);

//new sleep log
router.get('/:id/sleeps/new', sleepCtrl.new);

// Route to handle creating a new sleep log
router.post('/:id/sleeps', sleepCtrl.create);
router.get('/:id/sleeps/:sleepId', sleepCtrl.show);


module.exports = router;