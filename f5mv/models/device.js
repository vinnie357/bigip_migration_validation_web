// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var deviceSchema = new Schema({
  name: String,
  username: { type: String, required: true },
  password: { type: String, required: true },
  url: String,
  admin: Boolean,
  location: String,
  created_at: Date,
  updated_at: Date
});

// the schema is useless so far
// we need to create a model using it
var Device = mongoose.model('Device', deviceSchema);

// make this available to our devices in our Node applications
module.exports = Device;