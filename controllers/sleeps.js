const Sleep = require('../models/sleep');

module.exports = {
    index,
  };

  async function index(req, res) {
    const sleeps = await Sleep.find({});
    res.render('sleeps/index', {title: 'DreamCatcher User Page', sleeps });
  }