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
    collection.find({}).toArray(function(err, Devicelist) {
        assert.equal(err, null);
        console.log("Found the following records");
        console.log(Devicelist);
        var list = []
        Devicelist.forEach(function(doc) {
            list.push(Devicelist.devicename)
            console.log("adding:" + doc.devicename)            
            //console.log("Devicelist:" + list)    
        });
      });
      console.log("devicelist:", Devicelist)
      return Devicelist
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