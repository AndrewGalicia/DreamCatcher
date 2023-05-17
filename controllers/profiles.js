const Profile = require('../models/profile');
const User = require('../models/user');

async function show(req, res) {
  try {
    // console.log('show - req.user:', req.user);
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
  const user = await User.findById(req.user._id);
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

async function showUpdateForm(req, res) {
  try {
    const profileId = req.params.id;
    const profile = await Profile.findById(profileId);
    res.render('profiles/update', { title: 'Update Profile', profileId, profile, errorMsg: '' });
  } catch (err) {
    console.error(err);
    res.render('error', { error: err });
  }
}


async function updateProfile(req, res) {
  try {
    const profileId = req.params.id;
    const updatedProfile = await Profile.findByIdAndUpdate(profileId, {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      sleepGoal: {
        hours: req.body.sleepGoalHours || 0,
        minutes: req.body.sleepGoalMinutes || 0
      }
    }, { new: true });

    res.redirect(`/profiles/${updatedProfile._id}`);
  } catch (err) {
    console.error(err);
    res.render('error', { error: err });
  }
}

module.exports = {
  show,
  newProfile,
  createProfile,
  showUpdateForm,
  updateProfile
};