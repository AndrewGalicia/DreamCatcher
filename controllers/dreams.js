const Profile = require('../models/profile');

// Display the form for creating a new dream log
const newDream = async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);
    console.log('Profile:', profile);

    const sleep = profile.sleepLogs.id(req.params.sleepId);
    console.log('Sleep:', sleep);

    res.render('dreams/new', { title: 'New Dream Log Form', profile, sleep, error: null });
  } catch (error) {
    console.log(error);
    res.render('dreams/new', { profile: null, sleep: null, error: 'An error occurred' });
  }
};

// Handle creating a new dream log
const createDream = async (req, res) => {
    try {
      const { id, sleepId } = req.params;
  
      // Find the profile and sleep log based on the IDs in the URL
      const profile = await Profile.findById(id);
      if (!profile) {
        throw new Error('Profile not found');
      }
  
      const sleep = profile.sleepLogs.id(sleepId);
      if (!sleep) {
        throw new Error('Sleep log not found');
      }
  
      // Create a new dream log
      const dream = new profile.Dream({
        title: req.body.title,
        summary: req.body.summary,
        tags: req.body.tags.split(',').map(tag => tag.trim()),
      });
  
      // Add the dream log to the sleep log's dreamLogs array
      sleep.dreamLogs.push(dream);
  
      // Save the updated sleep log
      await profile.save();
      console.log('Profile Saved:', profile);
  
      const redirectUrl = `/profiles/${id}/sleeps/${sleepId}`;
      res.redirect(redirectUrl);
    } catch (error) {
      console.error('Error:', error.message);
      res.status(500).json({ error: error.message });
    }
  };
  
  

// Display the detailed view of a dream log
const showDream = async (req, res) => {
  try {
    // Find the profile and sleep log based on the IDs in the URL
    const profile = await Profile.findById(req.params.id);
    const sleep = profile.sleepLogs.id(req.params.sleepId);

    // Find the specific dream log within the sleep log
    const dream = sleep.dreamLogs.id(req.params.dreamId);

    res.render('dreams/show', { profile, sleep, dream });
  } catch (error) {
    console.log(error);
    res.redirect('/'); // Handle error appropriately
  }
};

const deleteDream = async (req, res) => {
    try {
      const { id, sleepId, dreamId } = req.params;
  
      // Find the profile based on the ID in the URL
      const profile = await Profile.findById(id);
  
      // Find the specific sleep log within the profile
      const sleep = profile.sleepLogs.id(sleepId);
  
      console.log('Dream ID:', dreamId);
      console.log('Sleep:', sleep);
  
      // Find the index of the specific dream log within the sleep log
      const dreamIndex = sleep.dreamLogs.findIndex(dream => dream._id.equals(dreamId));
  
      // Ensure the dream log exists and belongs to the sleep log
      if (dreamIndex === -1) {
        return res.status(404).render('error', { error: 'Dream log not found' });
      }
  
      // Remove the dream log from the sleep log's dreamLogs array
      sleep.dreamLogs.splice(dreamIndex, 1);
  
      // Save the updated profile
      await profile.save();
  
      // Add a forward slash at the beginning of the redirect URL
      res.redirect(`/profiles/${profile._id}/sleeps/${sleep._id}`);
    } catch (error) {
      console.log(error);
      res.render('error', { error: 'An error occurred while deleting the dream log' });
    }
  };
  
  
  
  
  
  
  
    
module.exports = {
    newDream,
    createDream,
    showDream,
    deleteDream
};