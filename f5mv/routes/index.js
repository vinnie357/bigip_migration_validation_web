var express = require('express');
var router = express.Router();
var request = require('request');
const db = require('../models/database')

/* GET home page. */
router.get('/', function(req, res, next) {
  var list = db.readRecord();
  res.render('index', { title: 'F5MigrationValidation', list: list });
});

/* POST discovery. */
router.post('/discovery', function(req, res) {
    console.log(req.body);
    var action = req.body.action
    var device = req.body.device
    db.createRecord(device);
    var list = db.readRecord();
    res.render('index', { error: { status: '200' }, title: 'F5MigrationValidation', action: action, device: device, list: list });
  });
module.exports = router;

//db.createRecordnpm