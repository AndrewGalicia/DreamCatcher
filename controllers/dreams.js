const Profile = require('../models/profile');

// Display the form for creating a new dream log
const newDream = async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);
    const sleep = profile.sleepLogs.id(req.params.sleepId);
    res.render('dreams/new', { title: 'New Dream Log Form', profile, sleep, error: null });
  } catch (error) {
    res.render('dreams/new', { profile: null, sleep: null, error: 'An error occurred' });
  }
};

// Handle creating a new dream log
const createDream = async (req, res) => {
  try {
    const { id, sleepId } = req.params;
    const profile = await Profile.findById(id);
    const sleep = profile.sleepLogs.id(sleepId);
    const dream = {
      title: req.body.title,
      summary: req.body.summary,
      tags: req.body.tags.split(',').map((tag) => tag.trim()),
    };
    sleep.dreamLogs.push(dream);
    await profile.save();
    const redirectUrl = `/profiles/${id}/sleeps/${sleepId}`;
    res.redirect(redirectUrl);
  } catch (error) {
    console.log('Error:', error);
    res.redirect('/'); // Handle error appropriately
  }
};

// Display the detailed view of a dream log
const showDream = async (req, res) => {
  try {
    const { id, sleepId, dreamId } = req.params;
    const profile = await Profile.findById(id);
    const sleep = profile.sleepLogs.id(sleepId);
    if (!sleep) {
      throw new Error('Sleep log not found');
    }
    const sleepStart = sleep.sleepStart.toISOString();
    const dream = sleep.dreamLogs.id(dreamId);
    if (!dream) {
      throw new Error('Dream log not found');
    }
    res.render('dreams/show', { sleepStart, dream });
  } catch (error) {
    console.log('Error:', error);
    res.render('error', { message: 'An error occurred', error });
  }
};

// Delete a dream log
const deleteDream = async (req, res) => {
  try {
    const { id, sleepId, dreamId } = req.params;
    const profile = await Profile.findById(id);
    const sleep = profile.sleepLogs.id(sleepId);
    const dreamIndex = sleep.dreamLogs.findIndex(dream => dream._id.equals(dreamId));
    if (dreamIndex === -1) {
      return res.status(404).render('error', { error: 'Dream log not found' });
    }
    sleep.dreamLogs.splice(dreamIndex, 1);
    await profile.save();
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
