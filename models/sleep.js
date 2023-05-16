const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sleepSchema = new mongoose.Schema({
    dreamed: {
        type: Boolean,
        default: true
    },
    sleepQuality: {
        type: String,
        enum: ['poor', 'ok', 'good',]
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
  });
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

// Compile the schema into a model and export it
module.exports = mongoose.model('Sleep', sleepSchema);