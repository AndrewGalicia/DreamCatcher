const Profile = require('../models/profile');
// const Dreams = require('../models/dream');

module.exports = {
   
    show,
    new: newProfile
    
  };


  async function show(req, res) {
    // Populate the cast array with performer docs instead of ObjectIds
    const profiles = await Profile.findById(req.params.id);
  
    res.render('profile/show', { title: 'Profile Page', profiles });
  }

  function newProfile(req, res) {
    // We'll want to be able to render an  
    // errorMsg if the create action fails
    res.render('profile/new', { title: 'New Profile', errorMsg: '' });
  }