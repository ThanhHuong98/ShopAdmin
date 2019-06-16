
var Order = require('../models/order');
var async = require('async');
var Sold = require('../models/sold');

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
            //console.log(results.listOrders);
            res.render('pages/order/order', { listOrders: results.listOrders});
        }
    });
}

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
    //console.log("id order", id);
    //console.log("staus order", status);
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
        
                       // console.log("Mang sau cap nhat", result);
                        var list = Object.keys(result.products.items)
                        //console.log(list);
                      
                        var index = list[0];
                        // console.log(index);
                        // console.log(result);
                        // console.log("items:.....\n", result.products.items[index].item.name);
                        // console.log(result.products.totalQty);
                        // console.log(result.products.totalPrice);
                        var priceSold =result.products.totalPrice;
                        var numberSold = result.products.totalQty
                        var update = result.update;
        
                        list.forEach(function(e,i){
                                  var index = e;
                                  var item = result.products.items[index];
                                  var qty = result.products.items[index].qty;
                                  var price = result.products.items[index].price;
                                  
                                  //console.log(i, item);
                                  // console.log("items:.....\n", result.products.items[index].item.name);
                                  if(item!=null){
                                      Sold.saveDataSold(numberSold,priceSold,item.item._id, item.item.name,item.item.category, item.item.image,
                                        qty,price,update,  function(err, result){
        
                                      })
                                  }
                                  
                              })
                        // var list = Object.keys(result.products.items)
                        // // console.log(list);
                        // // var index = list[0];
                        // // console.log(index);
                        // // console.log(result);
                        // // console.log("items:.....\n", result.products.items[index].item.name);
                        // console.log(result.products.totalQty);
                        // console.log(result.products.totalPrice);
                        // list.forEach(function(e){
                        //     var index = e;
                        //     var item = result.products.items[index];
                        //     console.log(item);
                        //     console.log("items:.....\n", result.products.items[index].item.name);
        
                        //     Sold.saveDataSold(result.products.items[index].item, function(err, result){
        
                        //     })
        
                        // })
        
                       // res.json(result);
                     })
                }
                res.redirect('/order');
            }
        })
    }else{
        res.redirect('/order');
    }
}