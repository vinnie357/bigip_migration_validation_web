var mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var Device = require('../models/device');

mongoose.connect('mongodb://localhost:27017/f5mv');
// CRUD
module.exports.createRecord = (device) => {
    console.log('createRecord')
    // create a new user
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