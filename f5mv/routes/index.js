var express = require('express');
var router = express.Router();
var request = require('request');
const db = require('../models/database')
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var Device = require('../models/device');
var ObjectID = require('mongodb').ObjectID;

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
/* GET device. */
router.get('/device/*', function(req, res, next) {
    // get all the devices
    var deviceurl = req.originalUrl
    //console.log(deviceurl)
    var splitdevice = deviceurl.split("/")
    //console.log(splitdevice)
    var idString = splitdevice[2]
    console.log(idString)
    //Device.findOne({_id: new ObjectID(idString)}, console.log)  // ok
    //Device.findOne({id: idString}, console.log)  // wrong! callback gets undefined
    Device.findOne({id: idString}, function(err, devices) {
        if (err) throw err;
        // object of all the users
        console.log("devices:", devices)
        res.render('device', { title: devices, devices: devices });
    });
});
/* POST discovery. */
router.post('/discovery', function(req, res) {
    console.log(req.body);
    var action = req.body.action
    var device = req.body.device
    var uid = ( new ObjectID())
    // create a new device
    var newDevice = Device({
        name: device,
        username: 'admin',
        password: 'admin',
        url:('/'+ uid),
        id: uid
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