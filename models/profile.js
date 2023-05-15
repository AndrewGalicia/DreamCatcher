const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
}, {timestamps: true });

// Compile the schema into a model and export it
module.exports = mongoose.model('Profile', profileSchema);