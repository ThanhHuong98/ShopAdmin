var  db = require('../db');
var ObjectId = require('mongodb').ObjectID;

//Get list sold ensure: update choose
exports.getListProductSold = function(passDate, cb){

    var passDateNumber = parseFloat(passDate);
    console.log(passDateNumber);
    // var collection = db.get().collection('Sold');
    // collection.find({"update": passDateNumber}).toArray(function(err, result){
    //     cb(err, result);
    // })
    var date = new Date();
    date.setHours(0,0,0,0);
    var currentDateNumber = date.getTime();
    console.log("current", currentDateNumber);
    
    //get data from yesterday: only yesterday
    if(passDateNumber == date.setDate(date.getDate() - 1)){
        currentDateNumber=passDateNumber;
    }
    
    var collection = db.get().collection('Sold');
    collection.find({
        update:{
            $gte:  passDateNumber,
            $lt:   currentDateNumber+1
        }
    }).toArray(function(err, result){
        cb(err, result);
    })
}


exports.saveDataSold = function(numberSold,priceSold,_id, name,category, image,
    qty,price, update,cb){
    var collection = db.get().collection('Sold');
    
    collection.findOne({idProduct:_id, update:update},function (err, result) {
        cb(err, result)
        console.log("sp da ban",result);
        //update
        if(result != null){
                var qtyCurrent = result.qty;
                var qtyUpdate = qtyCurrent + qty;
                collection.updateOne({_id : ObjectId(result._id)}, {
                    $set: {
                        qty: qtyUpdate,
                    }
                }, function(err, result){
                cb(err, result);
                });
        }//insert
        else{
            collection.insert({
                idProduct: _id,
                name,
                category,
                image,
                qty,
                price,
                numberSold,
                priceSold,
                update
            },function(err,result){
                cb(err,result)
            })
        }
    });
}

exports.getAllSold=function(cb){
    var collection = db.get().collection('Sold');
    collection.find({}).toArray(function(err, result){
        cb(err, result);
    })
}

