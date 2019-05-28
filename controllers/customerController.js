
var Customer = require('../models/customer');
var async = require('async');
var bcrypt = require('bcrypt');

exports.login = function(req, res, next){
    res.render('pages/account/login');
}

exports.verifyAccount = function(req, res, next){
    var email = req.body.email;
    var password = req.body.password;
    console.log("VERIFY ACCOUNT:", email, password);
    Customer.verifyAccount(email, password, function(err, user){
        if(err){
            return next(err);
        }
        else
        {
           if(user == undefined || user.length == 0) {
            res.redirect('/');
           }
           else {
            //     bcrypt.compare(password, user.pass, function (err, result) {
            //                     if (result == true) {
            //                         //res.redirect('/home');
            //                         res.render('pages/home/index');
                                
            //                     } else {
            //                     res.send('Incorrect password');
            //                     res.render('pages/account/login');
            //                     //res.redirect('/');
            //                     }
            //    });
                var role = user[0].role;
                console.log("ROLE: ", role);
                if(role==undefined) res.redirect('/');
                else if(role == 1){
                   res.redirect('/home');
                }
           }

        }
    });
}
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