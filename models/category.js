var db = require('../db');
var ObjectId = require('mongodb').ObjectID;

exports.all =function(cb){
    var collection = db.get().collection('Category');
    
    collection.find().toArray(function(err,result){
        cb(err,result)
    })
}

exports.create=function(cb){
    var collection=db.get().collection('Category');
}