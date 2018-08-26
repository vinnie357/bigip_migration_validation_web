const mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

MongoClient.connect("mongodb://localhost:27017/f5mv",{useNewUrlParser: true}, function(err, client) {
    //useNewUrlParser: true
    var db = client.db('f5mv');
    var collection = db.collection('devices');   
if(err) { return console.dir(err)}



// CRUD
module.exports.createRecord = (device) => {
    console.log('createRecord '+ device);
    var insert = {"devicename": '"' + device + '"'}
    console.log('insert: '+ insert);
    if(device != ""){
    collection.insertOne(insert)
    return 'record created'
    }    
}
module.exports.readRecord = () => {
    console.log('readRecord');
    var devices = collection.find({}).toArray(function(err, docs) {
        assert.equal(err, null);
        //console.log("Found the following records");
        //console.log(docs);
        var list = []
        docs.forEach(function(doc) {
            list.push(doc.devicename)
            //console.log("adding:" + doc)            
            //console.log("Devicelist:" + list)    
        });
        console.log("functionlist:" + list)
        return list
      });
      console.log(devices)
      var temp = "host.domain.com"
      return temp
}
module.exports.updateRecord = () => {
    console.log('updateRecord');
    return 'record updated'
}
module.exports.deleteRecord = () => {
    console.log('deleteRecord');
    return 'record deleted'
}

});