const express = require('express');
const router = express.Router();
const profilesCtrl = require('../controllers/profiles');
const sleepCtrl = require('../controllers/sleeps');
const dreamCtrl = require('../controllers/dreams');





//profile routes
// Route to display the form for creating a new profile
router.get('/new', profilesCtrl.newProfile);
// Route to handle creating a new profile
router.post('/', profilesCtrl.createProfile);
// Route to display the user's profile
router.get('/:id', profilesCtrl.show);
// Route to display the update form
router.get('/:id/update', profilesCtrl.showUpdateForm);
// Route to handle updating the profile
router.post('/:id/update', profilesCtrl.updateProfile);

//sleep routes
//new sleep log
router.get('/:id/sleeps/new', sleepCtrl.new);
// Route to handle creating a new sleep log
router.post('/:id/sleeps', sleepCtrl.create);
// Route showing detailed sleep log
router.get('/:id/sleeps/:sleepId', sleepCtrl.show);
// Route used to render all of the sleep logs on the profile page
router.get('/:id/sleeps/all', sleepCtrl.showAllSleepLogs);
// Route to delete the sleep log, currently does not work
router.delete('/:id/sleeps/:sleepId', sleepCtrl.delete);

// Dream routes
// Route to display the form for creating a new dream log
router.get('/:id/sleeps/:sleepId/dreams/new', dreamCtrl.newDream);
// Route to handle creating a new dream log
router.post('/:id/sleeps/:sleepId/dreams', dreamCtrl.createDream);
// Route to display the detailed dream log
router.get('/:id/sleeps/:sleepId/dreams/:dreamId', dreamCtrl.showDream);
// Route to delete the dream log
router.delete('/:id/sleeps/:sleepId/dreams/:dreamId', dreamCtrl.deleteDream)


module.exports = router;