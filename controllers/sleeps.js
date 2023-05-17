const Profile = require('../models/profile');

module.exports = {
    // index,
    show,
    new: newSleep,
    create,
    showAllSleepLogs,
    delete: deleteLog
  };

  // async function index(req, res) {
  //   const sleeps = await Sleep.find({}
  //   res.render('sleeps/index', {title: 'DreamCatcher User Page', sleeps });
  // }

  async function newSleep(req, res) {
    const profile = await Profile.findById(req.params.id).exec();
    res.render('sleeps/new', { title: 'New Sleep Log Form', errorMsg: '', profile: profile });
  }

  async function create(req, res) {
      try {
        console.log("------body-----", req.body)
        const profile = await Profile.findById(req.params.id);
        
        // if (!profile) {
        //   res.redirect(`/profiles/${req.params.id}`);
        // } else {
          profile.sleepLogs.push(req.body);
          console.log("---+---", profile)

          await profile.save();
          console.log("------", profile)
          res.redirect(`/profiles/${req.params.id}`);
        // }
      } catch (err) {
        res.render('sleeps/new', { title: 'New Sleep Log Form', errorMsg: 'Error creating sleep log', profile });
      }
    }

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

  async function showAllSleepLogs(req, res) {
    try {
      const profile = await Profile.findById(req.params.id);
      res.render('sleeps/allSleepLogs', { title: 'All Sleep Logs', profile });
    } catch (err) {
      console.error(err);
      res.render('error', { error: err });
    }
  }

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