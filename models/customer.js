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
    collection.find({email: email}).toArray(function(err, user){
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
        $set: {
            name : name,
            address : address,
            phone : phone,
            update : updatedTime
        }
    }, function(err, result){
        callBack(err, result);
    });
}
exports.editRole = function(id,role,callBack){
    var collection = db.get().collection('Customer');

    collection.updateOne({_id : ObjectId(id)}, {
        $set: {
            role: role
        }
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


const getUserByEmail= async(email, callBack) => { 
    var collection = await db.get().collection('Customer');
    const User = await collection.findOne({email});
    return User;
};
exports.getUserByEmail = getUserByEmail;

exports.validPassword = async function(email, password, cb){
    const user = await getUserByEmail(email);
    if(!user)
        return false;
    return await bcrypt.compare(password, user.pass);
};
