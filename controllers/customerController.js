
var Customer = require('../models/customer');
var async = require('async');

exports.user = function(req, res, next) {

    async.parallel({

        listCustomer: function (callback) {
            Customer.allCustomer(callback);
        },
        listCustomerHot: function (callback) {
            Customer.allCustomerByType("1",callback);
        },
        listCustomerNew: function (callback) {
            Customer.allCustomerByType("2",callback);
        }
    },function(err, results){
        if(err){res.err(err);}
        else {
            res.render('pages/user/user', {listCustomer: results.listCustomer,listCustomerHot: results.listCustomerHot,listCustomerNew:results.listCustomerNew  });
        }
    });
}

exports.edit = function(req, res, next)
{
    var id = req.body.id;
    var today = new Date();
    var updatedTime = today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear();
    var name = req.body.name;
    var address = req.body.address;
    var phone = req.body.phone;

    console.log("Edit 1 user");

    console.log(name);
    console.log(address);
    console.log(phone);
    console.log("id = ", id);

    Customer.editCustomer(id,  name, address, phone, updatedTime, function (err, result) {
        if (err) { return next(err); }
        else {
          res.redirect('/user');
        }
      });
}

exports.delete = function(req, res, next)
{
    const id= req.params.id;
    console.log("id user deleted:", id);

    Customer.deleteCustomer(id, function(err, result){
        if(err){
            return next(err);
        }
        else
        {
            res.redirect('/user');
        }
    });
}