const Profile = require('../models/profile');
const User = require('../models/user');

async function show(req, res) {
  try {
    console.log('show - req.user:', req.user);
    const user = await User.findById(req.user._id).populate('profile');
    console.log('show - user:', user);
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
  console.log('createProfile - req.user:', req.user);
  const user = await User.findById(req.user._id);
  console.log('createProfile - user:', user);
  const newProfile = new Profile({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    sleepGoal: {
      hours: req.body.sleepGoal ? req.body.sleepGoal.hours : 0,
      minutes: req.body.sleepGoal ? req.body.sleepGoal.minutes : 0
    }
  });
  await newProfile.save();
  user.profile = newProfile._id;
  await user.save();
  res.redirect(`/profiles/${newProfile._id}`);
}

module.exports = {
  show,
  newProfile,
  createProfile
};