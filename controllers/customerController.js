
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
    // Customer.allCustomer(function (err, docs) {
    //     if(err){res.err(err);}
    //     else {
    //         console.log(docs);
    //        // res.render('pages/user/user');
    //        res.render('pages/user/user', {listCustomer:docs});
    //      }
    // })

  }