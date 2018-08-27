var express = require('express');
var router = express.Router();
var request = require('request');
const db = require('../models/database')
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var Device = require('../models/device');

/* GET home page. */
router.get('/', function(req, res, next) {
    // get all the devices
    Device.find({}, function(err, devices) {
        if (err) throw err;
        // object of all the users
        //console.log("devices:", devices)
        res.render('index', { title: 'F5MigrationValidation', devices: devices });
    });
});
/* POST discovery. */
router.post('/discovery', function(req, res) {
    console.log(req.body);
    var action = req.body.action
    var device = req.body.device
    // create a new device
    var newDevice = Device({
        name: device,
        username: 'admin',
        password: 'admin',
        url:'/1'
        });
    
        // save the user
        newDevice.save(function(err) {
        if (err) throw err;
    
        console.log('Device created!');
        });
    //res.render('index', { error: { status: '200' }, title: 'F5MigrationValidation', action: action, devices: devices });
    res.redirect('/');
  });
module.exports = router;

//db.createRecordnpm