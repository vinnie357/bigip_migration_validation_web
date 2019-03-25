// vars
var Rest = require("./rest");
var Auth = require("./auth");
var Device = require('../models/device');
var mongoose = require('mongoose');
var assert = require('assert');
// db conn
try {
    mongoose.connect('mongodb://localhost:27017/f5mv',{ useNewUrlParser: true }, function(err, client) {
        assert.equal(null, err);    
        console.log("Connected to database")
    })
    }
    catch (err) {
        console.log("failed to connect to database")
        console.log(err)
    }
//
var request = {
    host: "bigipve.vinlab.com"
};

var Token = new Auth({
    host: request.host,
});
// var newRequest = new Rest({});
// Auth.getToken(request)
Token.getToken(request, function(err, response){
    if(err){
        console.log(err)
    };
    //console.log(response)
    request.token = response
    var newRequest = new Rest({
        host: request.host,
        uri: "/mgmt/tm/sys/provision",
        token: request.token
    });
    newRequest.getRequest(request, function(err,response){
        if(err){
            console.log(err)
        };
        var body = response
        var list = []
        var keys = Object.keys(body.items)
        keys.forEach(function(key) {
            list.push(body.items[key].name)
        });
        var answer = [];
        Object.keys(keys).forEach(function (key){
        list.push(keys[key])
        answer.push( {
            module: list[key],
            provisoning: body.items[keys[key]].level
          } );
        });
    
    Device.findOneAndUpdate({"id" : "5bb3bedcce583f063c742f04"},{ $set: {provsioning: answer,updated: Date.now()}}, function(err, doc) {
        //{ $set: {provsioning: answer,updated: Date.now()}}
        console.log("update ran", doc)
        if (err) throw err;
        // doc.provsioning = answer,
        // doc.updated = Date.now()
        // object of all the users
        //console.log("devices:", devices)
    });
        console.log(JSON.stringify(answer))
        //console.log(JSON.stringify(response))

    }
    )
}
)