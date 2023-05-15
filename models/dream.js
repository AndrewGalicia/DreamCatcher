const mongoose = require('mongoose');
// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema;


  const dreamSchema = new Schema({
    title: { type: String, required: true },
    summary: { type: String, required: true },
    tags: { type: [String], required: true }
  }, { timestamps: true });
  




// Compile the schema into a model and export it
module.exports = mongoose.model('Dream', dreamSchema);