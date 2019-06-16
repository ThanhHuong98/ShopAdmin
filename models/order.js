var  db = require('../db');
var ObjectId = require('mongodb').ObjectID;

// read all customer
exports.allOders = function (cb) {
    var collection = db.get().collection('Order');
    collection.find().toArray(function (err, docs) {

        cb(err, docs)

    })
}

// exports.allOdersByStatus=function (mstatus,cb) {
//     var collection = db.get().collection('Order');
//     collection.find({status: mstatus}).toArray(function(err, result){
//         cb(err, result)
//     })
// }

exports.updateStatus = function(id, status, callBack)
{
    var collection = db.get().collection('Order');
    if(status!=undefined){
        collection.updateOne({orderID: id}, {
            $set:{
                status : status,
            }
        }, function(err, result){
            callBack(err, result);
        });
    }

}
 exports.getListItem=function(id, cb){

    var collection = db.get().collection('Order');
    collection.findOne({ orderID: id }, function (err, result) {
        cb(err, result)
    })

 }