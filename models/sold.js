var  db = require('../db');
var ObjectId = require('mongodb').ObjectID;

exports.saveDataSold = function(orderCode,numberSold,priceSold,_id, name,category, image,
    qty,price, update,cb){

    var collection = db.get().collection('Sold');
    
    collection.findOne({idProduct:_id, update:update},function (err, result) {
        cb(err, result)
        console.log("sp da ban",result);
        //update
        if(result != null){
            if(result.orderCode!=orderCode){
                var qtyCurrent = result.qty;
                var qtyUpdate = qtyCurrent + qty;
                collection.updateOne({_id : ObjectId(result._id)}, {
                    $set: {
                        qty: qtyUpdate,
                    }
                }, function(err, result){
                cb(err, result);
                });
            }
            
        }//insert
        else{
            collection.insert({
                orderCode,
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

