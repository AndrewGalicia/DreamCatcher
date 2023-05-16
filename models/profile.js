const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const sleepSchema = require('./sleep').schema; // Import sleepSchema from the sleep model

const profileSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  sleepGoal: {
    type: {
      hours: {
        type: Number,
        min: 0,
        required: true
      },
      minutes: {
        type: Number,
        min: 0,
        max: 59,
        required: true
      }
    }
  },
  sleepLogs: [sleepSchema] // Add sleepSchema as a field in the profileSchema
}, {timestamps: true});

module.exports = mongoose.model('Profile', profileSchema);
