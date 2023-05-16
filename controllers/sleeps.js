const Sleep = require('../models/sleep');
const Profile = require('../models/profile');

module.exports = {
    index,
    show,
    new: newSleep,
    create
  };

  async function index(req, res) {
    const sleeps = await Sleep.find({});
    res.render('sleeps/index', {title: 'DreamCatcher User Page', sleeps });
  }

  function newSleep(req, res) {
    // We'll want to be able to render an  
    // errorMsg if the create action fails
    res.render('sleeps/new', {title: 'New Sleep Log Form', errorMsg: '' });
  }

  async function create(req, res) {
    const sleep = new Sleep({
      dreamed: req.body.dreamed === 'on',
      sleepQuality: req.body.sleepQuality,
      sleepStart: new Date(req.body.sleepStart),
      sleepEnd: new Date(req.body.sleepEnd)
    });
  
    try {
      await sleep.save();
      res.redirect(`/sleeps/${sleep._id}`);
    } catch (err) {
      res.render('sleeps/new', {title: 'New Sleep Log Form', errorMsg: 'Error creating sleep log' });
    }
  }

  async function show(req, res) {
    try {
      const profile = await Profile.findById(req.params.id);
      const sleep = await Sleep.findById(req.params.sleepId);
      if (!profile || !sleep) {
        res.redirect(`/profiles/${req.params.id}`);
      } else {
        res.render('sleeps/show', {
          title: 'Sleep Log Details',
          profile,
          sleep,
        });
      }
    } catch (err) {
      res.redirect(`/profiles/${req.params.id}`);
    }
  }