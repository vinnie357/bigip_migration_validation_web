var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'F5MigrationValidation' });
});

/* POST discovery. */
router.post('/discovery', function(req, res) {
    console.log(req.body);
    var action = req.body.action
    var device = req.body.device
    res.render('error', { error: { status: '200' }, title: 'F5MigrationValidation', action: action, device: device });
  });
module.exports = router;
