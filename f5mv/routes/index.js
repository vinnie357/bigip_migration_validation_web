var express = require('express');
var router = express.Router();
var request = require('request');
const db = require('../models/database')
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var Device = require('../models/device');
var ObjectID = require('mongodb').ObjectID;
const Resolve = require('../models/dns').Resolve;
// temp
const dns = require('dns');

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
    //console.log(idString)
    //Device.findOne({_id: new ObjectID(idString)}, console.log)  // ok
    //Device.findOne({id: idString}, console.log)  // wrong! callback gets undefined
    Device.findOne({id: idString}, function(err, devices) {
        if (err) throw err;
        // object of all the users
        //console.log("devices:", devices)
        res.render('device', { title: devices, devices: devices });
    });
});
/* POST discovery. */
router.post('/discovery', function(req, res) {
    //console.log(req.body);
    var action = req.body.action
    var device = req.body.device
    var deletebtn = req.body.delete
    //var device = req.body.host.domain.com
    if(device != ''){
        if(action == "discover"){
            var uid = ( new ObjectID())
            // create a new device
            //console.log("input type:", typeof device)
            //console.log(typeof device)
            // dns lookups
            var dnsinfo = new Resolve(device);
            var ip = {};
            function saveDevice() {
                // new device from schema
                var newDevice = Device({
                    name: device,
                    username: 'admin',
                    password: 'admin',
                    url:('/'+ uid),
                    id: uid,
                    hostname: host,
                    created: Date.now(),
                    address: ip
                    });
                
                    // save the device
                    newDevice.save(function(err) {
                    if (err) throw err;
                
                    console.log('Device created!');
                    });
                }
            dnsinfo.resolvedns(function(response){
                console.log(JSON.stringify(response));
                if (response.ip && response.host) {
                    ip = response.ip
                    host = response.host
                    saveDevice()
                }
                //console.log("dnsinfo:", JSON.stringify(response))
            });

        };
    //res.render('index', { error: { status: '200' }, title: 'F5MigrationValidation', action: action, devices: devices });
    };
    if(deletebtn != null){
        var device = req.body.delete
        //console.log("find and delete",device)
        Device.deleteOne({name: device }, function(err, devices) {
            if (err) throw err;
            // object deleted
            console.log("deleted", device)
        })
    };
    if(action == "check"){
        var devices = [req.body.checkbox]
        console.log("check:", JSON.stringify(devices))
        devices.forEach(item => {
        })

    }
    if(action == "diff"){
        var devices = [req.body.checkbox]
        var number = 0;
        console.log("diff:", JSON.stringify(devices))
        devices.forEach(item => {
           //console.log(item)
           if(typeof(item) == "object") {
                item.forEach(n => {
                number ++
                })
            }      
        })
        console.log("devices number:", number)
        if(number == 2) {
            console.log("diff two")
        } else {
            console.log("please select two devices")
        }
        
    }
    res.redirect('/');
  });
module.exports = router;

//db.createRecordnpm