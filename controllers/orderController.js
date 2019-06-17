
var Order = require('../models/order');
var async = require('async');
var Sold = require('../models/sold');

exports.order =function(req, res, next) {
    async.parallel({
        listOrders: function (callback) {
            Order.allOders(callback);
        },
    }, function(err, results){
        if(err){res.err(err);}
        else {
            res.render('pages/order/order', { listOrders: results.listOrders});
        }
    });
}

const filterOrder=function(req, res, next){
    const status = req.params.status;
    console.log("status filter", status);
     Order.getListItembyStatus(status, function(err, result){
        if(err) {res.err(err);}
        //console.log(result);
        // res.end("OK")
        res.json(result);
     })

}
exports.filterOrder = filterOrder;

const listItemsInOrder=function(req, res, next){
    const id = req.params.id;
    //console.log("Id list item: ", id);
     Order.getListItem(id, function(err, result){
        if(err) {res.err(err);}
        //console.log(result);
        // res.end("OK")
        res.json(result);
     })

}
exports.listItemsInOrder=listItemsInOrder;


exports.updateStatus = function(req, res, callBack)
{
    var id = req.query.id;
    var status = req.query.status;
    var statusNumber = parseInt(status, 10);
    if(statusNumber!= -1){
        Order.updateStatus(id, status, function(err, result){
            if(err)
            {
                return next(err);
            }
            else
            {
                
                if(statusNumber == 4){
                    Order.getListItem(id, function(err, result){
                        if(err) {res.err(err);}
                        var list = Object.keys(result.products.items)
                        var index = list[0];
                        var priceSold =result.products.totalPrice;
                        var numberSold = result.products.totalQty
                        var update = result.update;
        
                        list.forEach(function(e,i){
                                  var index = e;
                                  var item = result.products.items[index];
                                  var qty = result.products.items[index].qty;
                                  var price = result.products.items[index].price;
                                  if(item!=null){
                                      Sold.saveDataSold(numberSold,priceSold,item.item._id, item.item.name,item.item.category, item.item.image,
                                        qty,price,update,  function(err, result){
        
                                      })
                                  }
                                  
                              })
                     })
                }
                res.redirect('/order');
            }
        })
    }else{
        res.redirect('/order');
    }
}