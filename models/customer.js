var  db = require('../db');

// read all customer
exports.allCustomer = function (cb) {
    var collection = db.get().collection('Customer');
    collection.find().toArray(function (err, docs) {
        cb(err, docs)
    })
}

exports.allCustomerByType=function (mtype,cb) {
    var collection = db.get().collection('Customer');

    collection.find({type: mtype}).toArray(function(err, result){
        cb(err, result)
    })

}

exports.editCustomer = function (id, name, address, phone, updatedTime, callBack)
{
    var collection = db.get().collection('Customer');
    collection.updateOne({_id : ObjectId(id)}, {
        name : name,
        address : address,
        phone : phone,
        update : updatedTime
    }, function(err, result){
        callBack(err, result);
    });
}

exports.deleteCustomer = function (id, callBack)
{
    var collection = db.get().collection('Customer');
    collection.deleteOne({_id : ObjectId(id)}, function(err, result){
        callBack(err, result);
    });
}
