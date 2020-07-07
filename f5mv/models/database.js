var mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var Device = require('../models/device');
try {
mongoose.connect('mongodb://mongo:27017/f5mv',{ useNewUrlParser: true }, function(err, client) {
    assert.equal(null, err);    
    console.log("Connected to database")
})
}
catch (err) {
    console.log("failed to connect to database")
    console.log(err)
}
// CRUD
module.exports.createRecord = (device) => {
    console.log('createRecord')
    // create a new device
    var newDevice = Device({
    name: device,
    username: 'admin',
    password: 'admin',
    });

    // save the user
    newDevice.save(function(err) {
    if (err) throw err;

    console.log('Device created!');
    }); 
}
module.exports.readRecord = () => {
   console.log('readRecord');
    // get all the users
    Device.find({}, function(err, devices) {
        if (err) throw err;
        // object of all the users
        //console.log(devices);
        return devices
    });
} 
module.exports.updateRecord = () => {
    console.log('updateRecord');
    return 'record updated'
}
module.exports.deleteRecord = () => {
    console.log('deleteRecord');
    return 'record deleted'
}