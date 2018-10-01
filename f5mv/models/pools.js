//modules
var request = require('request');
var Secrets = require("../models/secrets");
var async = require("async");

const getToken = async function() {
// vars
username = Secrets.bigip_user;
password = Secrets.bigip_pass;
protocol = 'https:';
host = "bigipve.vinlab.com";
tokenuri = '/mgmt/shared/authn/login';
tokenurl = protocol + '//' + host + tokenuri;
auth = "Basic " + new Buffer(username + ":" + password).toString("base64");
token = ""

// Token auth request:
var post_data_json = JSON.stringify({
    "username":username,
    "password":password,
    "loginProviderName":"tmos"
    });
    
    var tokenoptions = {
    protocol: protocol,
    host: host,
    uri: tokenurl,   
    method: 'POST',
    sendImmediately: true,
    rejectUnauthorized: false,
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(post_data_json),
        'Authorization': auth 
    },
    json: post_data_json,
    };
var token_post = request(tokenoptions, function (error, response, body) {
    response.setEncoding('utf8');
    response.on('data', function (chunk) {
        // console.log('Response: ' + chunk);
    });
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    //console.log('body:', body); // Print the HTML for the Google homepage.
    // console.log("token:", response.body.token.token);
    if(response.statusCode == 200) {
        token = response.body.token.token
        //console.log("getToken:",token)
       // getVirtuals(token)
       tokenout = new Promise((resolve, reject) => {
        getVirtuals(token).then(resolve)
        });
        console.log("tokenout:",tokenout)
        return getVirtuals(token)
    };
    });
    
var answer = await token_post.write(post_data_json).then(console.log(answer));
};

//start
const start = async function() {
    const result = await getToken().then(console.log("result:", result));
}

// get virtuals
async function getVirtuals(token){
input = {
    token: token,
    device: "bigipve.vinlab.com",
    // uri: "/mgmt/tm/ltm/virtual",
   uri: "/mgmt/tm/ltm/pool/stats",
   // uri: "/mgmt/tm/ltm/virtual/~Common~Baker_custom/stats?ver=12.1.3#/",
    protocol: 'https:',
    // query: "?$select=name"
    // query: "?$select=name&$top=1"
    query: "?$top=5&$select=status.availabilityState,name"
    //query: "?"
}
  // set values
  protocol = input.protocol;
  host = input.device;
  uri = input.uri;
  query = input.query;
  url = protocol + '//' + host + uri + query;
  // set options
  var options = {
      protocol: protocol,
      host: input.device,
      uri: url,   
      sendImmediately: true,
      rejectUnauthorized: false,
      headers: {
          'Content-Type': 'application/json',
          'X-F5-Auth-Token': input.token 
      }
  };
// GET virtuals request
console.log(options.uri);
request(options, function (error, response, body) {
  // console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
 //console.log('body:', body); // Print the HTML for response.
  response.on('data', function (chunk) {
    //console.log('Response: ' + chunk);
  });
  var jsonbody = JSON.parse(body)
  var keys = Object.keys(jsonbody.entries)
  var poolList = [];
   Object.keys(keys).forEach(function (key){
    poolList.push( {
        name: keys[key],
        status: jsonbody.entries[keys[key]].nestedStats.entries["status.availabilityState"].description
      } );
    });
  console.log(JSON.stringify(poolList));
  return poolList
});
}

//start()
// console.log("done");
//console.log(JSON.stringify(poolList))
module.exports.start = start;
module.exports.getToken = getToken;


module.exports.test = new Promise((resolve, reject) => {
    start()
    console.log(toString(resolve))
    setTimeout(resolve.bind(null, 'someValueToBeReturned'), 2000);
});

//promise
// example = new Promise((resolve, reject) => {


// });