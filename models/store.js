var db = require('../db.js');
var ObjectId = require('mongodb').ObjectID;

exports.getAllStore = function(callBack)
{
    var collection = db.get().collection('Store');

    // collection.find().toArray(function(err, result){
    //     callBack(err, result);
    // });
    collection.aggregate([{$sample: {size: 6}}]).toArray(function (err, result) {
        callBack(err, result);
    });
}

exports.addStore = function(name, describe, img, address, callBack)
{
    var collection = db.get().collection('Store');
    collection.insert({
        name : name,
        describe : describe,
        image : img,
        address : address
    }, function(err, result){
        callBack(err, result);
    });
}

exports.editStore = function(id, name, describe, img, address, callBack)
{
    var collection = db.get().collection('Store');
    collection.updateOne({_id : ObjectId(id)}, {
        name : name,
        describe : describe,
        image : img,
        address : address
    }, function(err, result){
        callBack(err, result);
    });
}

exports.deleteStore = function(id, callBack)
{
    var collection = db.get().collection('Store');
    collection.deleteOne({_id : ObjectId(id)}, function(err, result){
        callBack(err, result);
    });
}