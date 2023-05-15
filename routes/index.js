var express = require('express');
var router = express.Router();
const profilesCtrl = require('../controllers/profiles');
const User = require('../models/user');


const passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// Google OAuth login route
router.get('/auth/google', passport.authenticate(
  // Which passport strategy is being used?
  'google',
  {
    // Requesting the user's profile and email
    scope: ['profile', 'email'],
    // Optionally force pick account every time
    // prompt: "select_account"
  }
));

// Google OAuth callback route
router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect: '/checkProfile',
    failureRedirect: '/login'
  }
));

router.get('/checkProfile', async function(req, res) {
  try {
    const user = await User.findById(req.user._id).populate('profile');
    if (user.profile) {
      res.redirect('/profiles');
    } else {
      res.redirect('/profiles/new');
    }
  } catch (err) {
    console.error(err);
    res.render('error', { error: err });
  }
});

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

// OAuth logout route
router.get('/logout', function(req, res){
  req.logout(function() {
    res.redirect('/'); //fix this to sleep log index
  });
});


module.exports = router;
