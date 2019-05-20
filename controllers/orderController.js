
var Order = require('../models/order');
var async = require('async');

exports.order =function(req, res, next) {
    async.parallel({
        listOrders: function (callback) {
            Order.allOders(callback);
        },
        lisOrdersDone: function (callback) {
            Order.allOdersByStatus("đã nhận", callback);
        }
    }, function(err, results){
        if(err){res.err(err);}
        else {
            console.log(results.listOrders);
            res.render('pages/order/order', { listOrders: results.listOrders});

        }
    });
}




// exports.user = function(req, res, next) {
//
//     async.parallel({
//
//         listCustomer: function (callback) {
//             Customer.allCustomer(callback);
//         },
//         listCustomerHot: function (callback) {
//             Customer.allCustomerByType("1",callback);
//         },
//         listCustomerNew: function (callback) {
//             Customer.allCustomerByType("2",callback);
//         }
//     },function(err, results){
//         if(err){res.err(err);}
//         else {
//             res.render('pages/user/user', {listCustomer: results.listCustomer,listCustomerHot: results.listCustomerHot,listCustomerNew:results.listCustomerNew  });
//         }
//     });
//
// }