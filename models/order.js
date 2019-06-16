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

 //Get list order ensure: update choose and status == 4
 exports.getlistOrderSuccessbyUpdate=function(passDate, cb){

    var passDateNumber = parseFloat(passDate);
    console.log(passDateNumber);

    var date = new Date();
    date.setHours(0,0,0,0);
    var currentDateNumber = date.getTime();
    console.log("current", currentDateNumber);
    
    //get data from yesterday: only yesterday
    if(passDateNumber == date.setDate(date.getDate() - 1)){
        currentDateNumber = passDateNumber;
    }
    
    // var collection = db.get().collection('Order');
    // collection.find({
    //     update:{
    //         $gte:  passDateNumber,
    //         $lt:   currentDateNumber+1
    //     },
    //     status: "4"
    // }).toArray(function(err, result){
    //     cb(err, result);
    // })
    var collection = db.get().collection('Order');
    collection.find({
        update:{
                    $gte:  passDateNumber,
                    $lt:   currentDateNumber+1
                },
        status:"4"
    }).toArray(function (err, result){
        cb(err, result)

    }) 
 }