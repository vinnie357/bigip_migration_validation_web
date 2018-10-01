//modules
var request = require('request');
var Secrets = require("../models/secrets");
var async = require("async");
var bodyParser = require('body-parser')
var jsonQuery = require('json-query')

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
        console.log("getToken:",token)
        getVirtuals(token)
        return token
    };
    });
    
var answer = await token_post.write(post_data_json);
// console.log("answer:",answer)
// return answer
};
const start = async function() {
    const result = await getToken();
    console.log("result:", result)
}
function getVirtuals(token){
input = {
    token: token,
    device: "bigipve.vinlab.com",
    // uri: "/mgmt/tm/ltm/virtual",
   uri: "/mgmt/tm/ltm/virtual/stats",
   // uri: "/mgmt/tm/ltm/virtual/~Common~Baker_custom/stats?ver=12.1.3#/",
    protocol: 'https:',
    // query: "?$select=name"
    // query: "?$select=name&$top=1"
    //query: "?$top=5&$select=status.availabilityState,name"
     query: "?"
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
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
 //console.log('body:', body); // Print the HTML for the Google homepage.
  response.on('data', function (chunk) {
    //console.log('Response: ' + chunk);
    // var virtuals = JSON.parse(chunk);
    // console.log(virtuals.kind);
    // console.log(virtuals.kind)
  });
    var jsonbody = JSON.parse(body)
    // console.log(virtuals);
//    console.log(jsonbody)
//    console.log(jsonbody.kind)
//    console.log(jsonbody.selfLink)
//    console.log(jsonbody.currentItemCount)
   var list = []
   var step1 = jsonbody
   var keys = Object.keys(jsonbody.entries)
   var list3 = []
   keys.forEach(function(virtual) {
        list3.push(jsonbody.entries[virtual].nestedStats.entries["status.availabilityState"].description)
   });
   var objectlist = list3;
   var key1 = keys[0];
   var step3 = jsonbody.entries[keys[0]].nestedStats.entries["status.availabilityState"].description;
   var vslist = [];
   Object.keys(keys).forEach(function (key){
    //console.log("step1key",key[0]);
    list.push(keys[key])
    vslist.push( {
        name: keys[key],
        status: jsonbody.entries[keys[key]].nestedStats.entries["status.availabilityState"].description
      } );
    });
    //var getVSstatus= jsonbody.entries["https://localhost/mgmt/tm/ltm/virtual/~Common~adfs_tmp.app~adfs_tmp_adfs_vs/stats"].nestedStats.entries["status.availabilityState"].description
});
}

start()
console.log("done")
