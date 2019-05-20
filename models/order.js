var  db = require('../db');

// read all customer
exports.allOders = function (cb) {
    var collection = db.get().collection('Oders');
    collection.find().toArray(function (err, docs) {
        cb(err, docs)
    })
}

exports.allOdersByStatus=function (mstatus,cb) {
    var collection = db.get().collection('Oders');
    collection.find({status: mstatus}).toArray(function(err, result){
        cb(err, result)
    })
}

exports.updateStatus = function(id, status, callBack)
{
    var collection = db.get().collection('Orders');
    collection.updateOne({_id: ObjectId(id)}, {
        status : status
    }, function(err, result){
        callBack(err, result);
    });
}
