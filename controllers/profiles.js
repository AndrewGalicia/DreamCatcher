const Profile = require('../models/profile');
const User = require('../models/user');

async function show(req, res) {
  try {
    const user = await User.findById(req.user._id).populate('profile');
    res.render('profiles/show', { title: 'Profile Page', profile: user.profile });
  } catch (err) {
    console.error(err);
    res.render('error', { error: err });
  }
}

function newProfile(req, res) {
  res.render('profiles/new', { title: 'New Profile', errorMsg: '', profile: null });
}

async function createProfile(req, res) {
  try {
    const { firstName, lastName, sleepGoalHours, sleepGoalMinutes } = req.body;
    const sleepGoal = { hours: sleepGoalHours, minutes: sleepGoalMinutes };
    const profile = new Profile({ firstName, lastName, sleepGoal });
    const savedProfile = await profile.save();
    const user = await User.findById(req.user._id);
    user.profile = savedProfile._id;
    await user.save();
    res.redirect('/profile');
  } catch (err) {
    console.error(err);
    res.render('profiles/new', { title: 'New Profile', errorMsg: err.message, profile: req.body });
  }
}

module.exports = {
  show,
  newProfile,
  createProfile
};
