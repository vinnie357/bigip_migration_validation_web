const mongoose = require('mongoose');
// CRUD
module.exports.createRecord = (device) => {
    console.log('createRecord '+ device);
    return 'record created'
}
module.exports.readRecord = () => {
    console.log('readRecord');
    return 'record read'
}
module.exports.updateRecord = () => {
    console.log('updateRecord');
    return 'record updated'
}
module.exports.deleteRecord = () => {
    console.log('deleteRecord');
    return 'record deleted'
}