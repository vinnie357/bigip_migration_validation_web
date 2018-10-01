// modules
var request = require('request');
var Secrets = require("../models/secrets");

// Constructor
const Auth = function(input) {

  // Set default options
  this.host   = (typeof input.host   === 'string')  ? input.host   : '127.0.0.1';
  this.protocol  = (typeof input.protocol  === 'string')  ? input.protocol  : 'https:';
  //this.port   = (typeof input.port   === 'number')  ? input.port   : 443;
  this.username   = (typeof input.username   === 'string')  ? input.username   : Secrets.bigip_user;
  this.password   = (typeof input.password   === 'string')  ? input.password   : Secrets.bigip_pass;
  this.uri    = (typeof input.uri === 'string') ? input.uri : '/mgmt/shared/authn/login';
  this.auth   = (typeof input.auth === 'string') ? input.auth : "Basic " + new Buffer(this.username + ":" + this.password).toString("base64")
  this.url = (typeof input.url === 'string') ? input.url : this.protocol + '//' + this.host + this.uri;
  this.debug  = (typeof input.debug  === 'boolean') ? input.debug  : false;
  this.ignorecert = (typeof input.ignorecert === 'boolean') ? input.ignorecert : false;


  if (this.debug) { request.debug = true; }
  //rejectUnauthorized setting for request lib
  ignorecerts = (this.ignorecert) ? false : true;
};

// Get Token
Auth.prototype.getToken = function(input, cb) {
  var post_data_json = {
    "username":this.username,
    "password":this.password,
    "loginProviderName":"tmos"
  };
  var options = {
    protocol: this.protocol,
    host: this.host,
    uri: this.uri,
    method: 'POST',
    sendImmediately: true,
    rejectUnauthorized: this.ignorecert,
    headers: {
      'Content-Type': 'application/json',
     // 'Content-Length': Buffer.byteLength(post_data_json),
      'Authorization': this.auth 
    },
    json: post_data_json
  };;
  this._requestToken(options, cb);
};
// Make request
Auth.prototype._requestToken = function(input,cb) {
  //vars
  var post_data_json = {
    "username":this.username,
    "password":this.password,
    "loginProviderName":"tmos"
  };
  //options
  options = {
    protocol: this.protocol,
    host: this.host,
    uri: this.url,
    method: 'POST',
    sendImmediately: true,
    rejectUnauthorized: this.ignorecert,
    headers: {
      'Content-Type': 'application/json',
      //'Content-Length': Buffer.byteLength(post_data_json),
      'Authorization': this.auth 
    },
    json: true,
    body: post_data_json
  };
  request(options, function (error, response, body) {
    if(error){console.log('error:', error)}; // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  response.setEncoding('utf8');
  response.on('data', function (chunk) {
      console.log('Response: ' + chunk);
  });
  //console.log('body:', body); // Print the HTML for the Google homepage.
  //console.log("token:", response.body.token.token);
  //return response.body.token.token
  return cb(false, response.body.token.token);
});
}
module.exports = Auth;