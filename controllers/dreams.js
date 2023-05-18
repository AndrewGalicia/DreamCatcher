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
      const sleep = profile.sleepLogs.id(sleepId);
  
      // Create a new dream log
      const dream = {
        title: req.body.title,
        summary: req.body.summary,
        tags: req.body.tags.split(',').map((tag) => tag.trim()),
      };
  
      // Add the dream log to the sleep log's dreamLogs array
      sleep.dreamLogs.push(dream);
  
      // Save the updated sleep log
      await profile.save();
      console.log('Profile Saved:', profile);
  
      const redirectUrl = `/profiles/${id}/sleeps/${sleepId}`;
      res.redirect(redirectUrl);
    } catch (error) {
      console.log('Error:', error);
      res.redirect('/'); // Handle error appropriately
    }
  };
  
  
  

// Display the detailed view of a dream log
// Display the detailed view of a dream log
// Display the detailed view of a dream log
async function showDream(req, res) {
    try {
      const { id, sleepId, dreamId } = req.params;
  
      // Find the profile based on the ID in the URL
      const profile = await Profile.findById(id);
  
      // Find the specific sleep log within the profile
      const sleep = profile.sleepLogs.id(sleepId);
  
      // If sleep log or dream log is not found, throw an error
      if (!sleep) {
        throw new Error('Sleep log not found');
      }
  
      // Retrieve additional information from the sleep log
      const sleepStart = sleep.sleepStart.toISOString(); // Convert to string format
  
      // Find the specific dream log within the sleep log
      const dream = sleep.dreamLogs.id(dreamId);
  
      // If dream log is not found, throw an error
      if (!dream) {
        throw new Error('Dream log not found');
      }
  
      // Render the show view within the dreams folder with the retrieved data
      res.render('dreams/show', { sleepStart, dream });
    } catch (error) {
      console.log('Error:', error);
      res.render('error', { message: 'An error occurred', error }); // Render the error page with the error information
    }
  }
  
  

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