var db = require('../db');

exports.getAllCategory = function(callBack)
{
    var collection = db.get().collection('Category');

    collection.find().toArray(function(err, docs){
        callBack(err, docs)
    });
}

exports.findCategory = function(id, callBack)
{
    var collection = db.get().collection('Category');
    collection.findOne({_id: ObjectId(id)}).toArray(function(err, result){
        callBack(err, result);
    });
}

exports.addCategory = function(category, callBack)
{
    var collection = db.get().collection('Category');

    collection.insertOne(category, function(err, result){
        callBack(err, result);
    });
}

exports.editCategory = function(id, category, callBack)
{
    var collection = db.get().collection('Category');

    collection.updateOne({"_id" : ObjectId(id)}, category, function(err, result){
        callBack(err, result);
    });
}

exports.deleteCategory = function(id, callBack)
{
    var collection = db.get().collection('Category');

    collection.deleteOne({ "_id" : ObjectId(id) }, function(err, result){
        callBack(err, result);
    });
}

