const Profile = require('../models/profile');
//new sleep form
async function newSleep(req, res) {
  const profile = await Profile.findById(req.params.id).exec();
  res.render('sleeps/new', { title: 'New Sleep Log Form', errorMsg: '', profile: profile });
}
//new create form
async function create(req, res) {
  try {
    const profile = await Profile.findById(req.params.id);
    profile.sleepLogs.push(req.body);
    await profile.save();
    res.redirect(`/profiles/${req.params.id}`);
    } catch (err) {
      res.render('sleeps/new', { title: 'New Sleep Log Form', errorMsg: 'Error creating sleep log', profile });
    }
}
//new show form
async function show(req, res) {
  try {
      const profile = await Profile.findById(req.params.id);
      const sleepLog = profile.sleepLogs.id(req.params.sleepId); // Fetch the specific sleep log
      if (!profile || !sleepLog) {
        res.redirect(`/profiles/${req.params.id}`);
      } else {
        res.render('sleeps/show', {
          title: 'Sleep Log Details',
            profile,
          sleep: sleepLog, // Pass the fetched sleep log to the template
        });
      }
    } catch (err) {
      res.redirect(`/profiles/${req.params.id}`);
    }
}
//all sleep log used to iterate in the profile page
async function showAllSleepLogs(req, res) {
  try {
    const profile = await Profile.findById(req.params.id);
      res.render('sleeps/allSleepLogs', { title: 'All Sleep Logs', profile });
  } catch (err) {
      console.error(err);
      res.render('error', { error: err });
  }
}
//delete's the sleep log
async function deleteLog(req, res) {
  try {
    const profile = await Profile.findById(req.params.id);
    profile.sleepLogs.pull(req.params.sleepId); // Use pull instead of remove to delete the sleep log
    await profile.save();
    res.redirect(`/profiles/${req.params.id}`);
  } catch (err) {
    console.error(err);
    res.render('error', { error: err });
  }
}

module.exports = {
  show,
  new: newSleep,
  create,
  showAllSleepLogs,
  delete: deleteLog
};