var db = require('../db.js');
var ObjectId = require('mongodb').ObjectID;

exports.addOne = function(product, cb){
    var collection = db.get().collection('Product');
    collection.insertOne(product, function(err, result){
            cb(err, result);
    });
}


// exports.add = async (product) => {
//     return await dbs.production.collection('products').insertOne(product);
//   };
  