const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//used for google authentication. has relationship with profile:
const userSchema = new Schema({
    name: String,
    googleId: {
      type: String,
      required: true
    },
    email: String,
    avatar: String,
    profile: {
      type: Schema.Types.ObjectId,
      ref: 'Profile'
    }

  }, {
    timestamps: true
  });

module.exports = mongoose.model('User', userSchema);
