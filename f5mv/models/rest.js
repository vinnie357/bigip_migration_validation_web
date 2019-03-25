// modules
var request = require('request');

// Request construct
const Rest = function(input) {
  // Set default options
 this.host   = (typeof input.host   === 'string')  ? input.host   : '127.0.0.1';
 this.protocol  = (typeof input.protocol  === 'string')  ? input.protocol  : 'https:';
 this.method  = (typeof input.method  === 'string')  ? input.method  : 'GET';
 this.uri    = (typeof input.uri === 'string') ? input.uri : '/mgmt/tm/ltm/virtual/stats';
 this.query   = (typeof input.query   === 'string')  ? input.query   : "?";
 this.url = (typeof input.url === 'string') ? input.url : this.protocol + '//' + this.host + this.uri + this.query;
 this.token   = (typeof input.token   === 'string')  ? input.token  : "";
 this.debug  = (typeof input.debug  === 'boolean') ? input.debug  : false;
 this.ignorecert = (typeof input.ignorecert === 'boolean') ? input.ignorecert : false;

 if (this.debug) { request.debug = true; }
 //rejectUnauthorized setting for request lib
 ignorecerts = (this.ignorecert) ? false : true;

}
// make request
Rest.prototype.getRequest = function(input,cb) {
  //options
  var options = {
    protocol: this.protocol,
    host: this.host,
    uri: this.url,
    method: this.method,   
    sendImmediately: true,
    rejectUnauthorized: false,
    headers: {
        'Content-Type': 'application/json',
        'X-F5-Auth-Token': this.token 
    }
};
// GET  Request
console.log(options.host)
console.log(options.uri);
request(options, function (error, response, body) {
  if(error){console.log('error:', error)}; // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
 //console.log('body:', body); // Print the HTML.
  response.on('data', function (chunk) {
    console.log('Response: ' + chunk);
  });
  var jsonbody = JSON.parse(body)
  return cb(false, jsonbody);
});
};

module.exports = Rest;