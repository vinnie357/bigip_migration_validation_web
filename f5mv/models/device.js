// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var deviceSchema = new Schema({
  id: { type: String, required: true, unique: true },
  name: String,
  username: { type: String, required: true },
  password: { type: String, required: true },
  url: String,
  admin: Boolean,
  location: String,
  created: Date,
  updated: Date,
  address: { type: String, required: true },
  hostname: String,
  provsioning: Object
});

// the schema is useless so far
// we need to create a model using it
var Device = mongoose.model('Device', deviceSchema);

// make this available to our devices in our Node applications
module.exports = Device;