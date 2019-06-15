
var Order = require('../models/order');
var async = require('async');

exports.order =function(req, res, next) {
    async.parallel({
        // status:function(callBack){
        //     Order.getStatus(callBack);
        // },
        listOrders: function (callback) {
            Order.allOders(callback);
        },
    }, function(err, results){
        if(err){res.err(err);}
        else {
            console.log(results.listOrders);
            res.render('pages/order/order', { listOrders: results.listOrders});
        }
    });
}

exports.listItemsInOrder=function(req, res, next){
    const id = req.params.id;
console.log("Id list item: ", id);
     Order.getListItem(id, function(err, result){
        if(err) {res.err(err);}
        console.log(result);
        // res.end("OK")
        res.json(result);
     })

}

exports.updateStatus = function(req, res, callBack)
{
    var id = req.query.id;
    var status = req.query.status;

    console.log("id order", id);
    console.log("staus order", status);
    
    Order.updateStatus(id, status, function(err, result){
        if(err)
        {
            return next(err);
        }
        else
        {
            res.redirect('/order');
        }
    })
}

function myFunction() {
    x = document.getElementById("mySelect").value;
   // document.getElementById("demo").innerHTML = "You selected: " + x;
}
