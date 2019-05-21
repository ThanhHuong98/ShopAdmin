
var db = require('../db.js');
var ObjectId = require('mongodb').ObjectID;

exports.getAllCategory = function(callBack)
{
    var collection = db.get().collection('Category');

    // collection.find().toArray(function(err, docs){
    //     callBack(err, docs)
    // });

    collection.aggregate([{$sample: {size: 4}}]).toArray(function (err, result) {
        callBack(err, result);
    });
}

exports.findCategory = function(id, callBack)
{
    var collection = db.get().collection('Category');
    collection.findOne({_id: ObjectId(id)}).toArray(function(err, result){
        callBack(err, result);
    });
}

exports.addCategory = function(name, code, img, callBack)
{
    var collection = db.get().collection('Category');
    collection.insertOne({
        code : code,
        name : name,
        image: img
    }, function(err, result){
        callBack(err, result);
    });
}

exports.editCategory = function(id, name, code, img, callBack)
{
    var collection = db.get().collection('Category');

    collection.updateOne({_id : ObjectId(id)}, {
        code : code,
        name : name,
        image : img
    }, function(err, result){
        callBack(err, result);
    });
}

exports.deleteCategory = function(id, callBack)
{
    var collection = db.get().collection('Category');

    collection.deleteOne({ _id : ObjectId(id) }, function(err, result){
        callBack(err, result);
    });
}