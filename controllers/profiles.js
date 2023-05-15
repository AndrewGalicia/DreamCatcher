const Profile = require('../models/profile');
const User = require('../models/user');

async function show(req, res) {
  try {
    const user = await User.findById(req.user._id).populate('profile');
    res.render('profiles/show', { title: 'Profile new Page', profile: user.profile });
  } catch (err) {
    console.error(err);
    res.render('error', { error: err });
  }
}

function newProfile(req, res) {
  res.render('profiles/new', { title: 'New Profile', errorMsg: '', profile: null });
}

async function createProfile(req, res) {
  const user = await User.findById(req.user._id);
  const newProfile = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    sleepGoal: {
      hours: req.body.sleepGoal.hours,
      minutes: req.body.sleepGoal.minutes
    }
  };
  user.profile = newProfile;
  await user.save();
  res.redirect(`/profiles/${user.profile._id}`);
}

module.exports = {
  show,
  newProfile,
  createProfile
};
