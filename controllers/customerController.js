
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
    Customer.editCustomer(req.query.id, function (err, result) {
        if (err) { return next(err); }
        else {
          res.redirect('./user');
        }
      });
}

exports.delete = function(req, res, next)
{
    Customer.deleteCustomer(req.query.id, function(err, result){
        if(err){
            return next(err);
        }
        else
        {
            res.redirect('./user');
        }
    });
}