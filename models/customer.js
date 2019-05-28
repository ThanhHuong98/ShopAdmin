var  db = require('../db');
var ObjectId = require('mongodb').ObjectID;
var bcrypt = require('bcrypt');

// read all customer
exports.allCustomer = function (cb) {
    var collection = db.get().collection('Customer');
    collection.find().toArray(function (err, docs) {
        cb(err, docs)
    })
}


exports.verifyAccount = function(email, password, cb){
    var collection = db.get().collection('Customer');
    // collection.findOne({email: email}).then(function(user){
    //     if(!user){
    //         //res.redirect('/');
    //     }else{
    //         bcrypt.compare(password, user.pass, function (err, result) {
    //             if (result == true) {
    //                 //res.redirect('/home');
    //                 //result="Success";
    //                 cb(err, result);
    //             } else {
    //             //  res.send('Incorrect password');
    //             //  res.redirect('/');
    //             result="Fail";
    //             //cb(err, result);
    //             }
    //         });
    //     }
    // });

    collection.find({email: email, pass: password}).toArray(function(err, user){
            cb(err, user);
            console.log("USER", user);
        })

}

exports.allCustomerByType=function (mtype,cb) {
    var collection = db.get().collection('Customer');

    collection.find({type: mtype}).toArray(function(err, result){
        cb(err, result)
    })

}

exports.editCustomer = function (id, name, address, phone, updatedTime, callBack)
{
    var collection = db.get().collection('Customer');
    collection.updateOne({_id : ObjectId(id)}, {
        name : name,
        address : addres,
        phone : phone,
        update : updatedTime
    }, function(err, result){
        callBack(err, result);
    });
}

exports.deleteCustomer = function (id, callBack)
{
    var collection = db.get().collection('Customer');
    collection.deleteOne({_id : ObjectId(id)}, function(err, result){
        callBack(err, result);
    });
}
