const express = require('express');
const router = express.Router();
const profilesCtrl = require('../controllers/profiles');


// GET /profile/show
// Route to display the user's profile
router.get('/profiles', profilesCtrl.show);

// Route to display the form for creating a new profile
router.get('/profiles/new', profilesCtrl.newProfile);

// Route to handle creating a new profile
router.post('/profiles/new', profilesCtrl.createProfile);




module.exports = router;