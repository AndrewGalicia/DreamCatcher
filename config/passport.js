const passport = require('passport');

const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../models/user');
const Profile = require('../models/profile');

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_SECRET,
  callbackURL: '/oauth2callback'
},
async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await User.findOne({ googleId: profile.id });
    if (!user) {
      user = new User({
        name: profile.displayName,
        googleId: profile.id,
        email: profile.emails[0].value,
        avatar: profile.photos[0].value
      });
      const profileData = {
        firstName: 'John',
        lastName: 'Doe',
        sleepGoal: {
          hours: 8,
          minutes: 0
        }
      };
      const newProfile = new Profile(profileData);
      user.profile = newProfile._id;
      await newProfile.save();
      await user.save();
    }
    return done(null, user);
  } catch (err) {
    return done(err);
  }
}
));


  passport.serializeUser(function(user, cb) {
    cb(null, user._id);
  });

  passport.deserializeUser(async function(userId, cb) {
    // It's nice to be able to use await in-line!
    cb(null, await User.findById(userId));
  });