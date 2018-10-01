const dns = require('dns');
const isIp = require('is-ip');
const util = require('util');
/*
dns.lookup('iana.org', (err, address, family) => {
  console.log('address: %j family: IPv%s', address, family);
});
*/
function DNS(device) {
    "use strict";
    this.resolvedns = function(callback) {
        var answer = {};
       function forward (device, callback) {
            //console.log("forward lookup", device);
            dns.resolve4(device, function (err, add, fam) {
                if(err) {console.log(err);callback(err)};
                callback(add)
            })
        };
       function reverse (device, callback) {
           // console.log("reverse lookup", device);
            dns.reverse(device, function (err, add, fam) {
                if(err) {console.log(err);callback(err)};
                //console.log('addr: '+add);
                callback(add)
            })
        };
        function _resolvedns(device, callback) {
            if(isIp(device)) {
                reverse(device, function(response){
                    answer.ip = device
                    answer.host = response
                    callback(answer)
                });    
            } else {
                forward(device, function(response){
                    answer.ip = response
                    answer.host = device
                    callback(answer)
                });
            }
        };
        // function call
        _resolvedns(device, function(response){
            //console.log(response)
            // answer = [];
            // Object.keys(response).forEach(function(key){
            //     console.log(key + '=' + response[key]);
            //     answer.push(response[key]);
            //  });
            callback(response);
        });
    };
};
module.exports.Resolve = DNS;