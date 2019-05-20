var db = require('../db.js');
var ObjectId = require('mongodb').ObjectID;

exports.addOne = function(product, cb){
    var collection = db.get().collection('Product');
    collection.insertOne(product, function(err, result){
            cb(err, result);
    });
}
exports.all = function(cb){
    var collection = db.get().collection('Product');
    collection.aggregate([
        {
            $lookup:
            {
                from: "Category",
                localField: "category",
                foreignField: "code",
                as: "category_field"
            }
        }
    ]).toArray((err,result)=>{
        cb(err,result)
    })
}
exports.add = function(name,info,category,price,quantity,image,cb){
    var collection = db.get().collection('Product');
    collection.insert({
        name : name,
        info: info,
        category : category,
        price : price,
        quantity :  quantity,
        image :  image
    },function(err,result){
        cb(err,result)
    })
}

exports.edit = function(id,name,info,category,price,quantity,image,cb){    
    var collection = db.get().collection('Product');
    collection.update({
        _id: ObjectId(id)
    },
        {
        name : name,
        info: info,
        category : category,
        price : price,
        quantity :  quantity,
        image :  image
    },function(err,result){
        cb(err,result)
    })
}

exports.delete = function(id,cb){    
    var collection = db.get().collection('Product');
    collection.deleteOne({
        _id: ObjectId(id)
    },function(err,result){
        cb(err,result)
    })
}
  