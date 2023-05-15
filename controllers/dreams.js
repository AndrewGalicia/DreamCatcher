const Dream = require('../models/dream');

module.exports = {
  index,
  new: newDream

};

async function index(req, res) {
  const dreams = await Dream.find({});
  res.render('dreams/index', { title: 'All User Dreams', dreams });
  console.log("started working")
}

function newDream(req, res) {
    // We'll want to be able to render an  
    // errorMsg if the create action fails
    res.render('dreams/new', {title: 'New Dream Form', errorMsg: '' });
  }