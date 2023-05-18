const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//for dream logs
const dreamSchema = new Schema({
    title: { type: String, required: true },
    summary: { type: String, required: true },
    tags: { type: [String], required: true }
  }, { timestamps: true });
  
//for sleep logs
const sleepSchema = new mongoose.Schema({
    dreamLogs: [dreamSchema],
    dreamed: {
        type: Boolean,
        default: true
    },
    sleepQuality: {
        type: String,
        enum: ['Poor', 'Ok', 'Good',]
    },
    sleepStart: {
      type: Date,
      required: true,
    },
    sleepEnd: {
      type: Date,
      required: true,
    },
    sleepDuration: {
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
      },
      validate: {
        validator: function() {
          return this.sleepStart < this.sleepEnd;
        },
        message: 'Sleep end time must be after sleep start time'
      }
    }
  }); //special function so taht I can have amount of time slept
  sleepSchema.pre('save', function(next) {
    const durationInMinutes = Math.round((this.sleepEnd - this.sleepStart) / (1000 * 60));
    this.sleepDuration = {
      hours: Math.floor(durationInMinutes / 60),
      minutes: durationInMinutes % 60
    };
    next();
  },{
    timestamps: true
  });
//main profile page
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
