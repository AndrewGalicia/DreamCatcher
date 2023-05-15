const Sleep = require('../models/sleep');
// const Dream = require('../models/dream');

module.exports = {
    index,
    new: newSleep
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