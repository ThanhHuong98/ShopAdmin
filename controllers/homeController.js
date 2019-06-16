var Order = require('../models/order');
var async = require('async');
var Sold = require('../models/sold');




exports.index = async function(req, res, next) {
    const user = await req.user;
    //console.log("user in session:", user);
    if(user){
      // Order.allOders(function(err,listOrder){
      //   if(err){
      //     res.err(err);
      //   }else
      //   {

      //     console.log(listOrder);
          // listOrder.forEach(element => {

          //    for (var i = 0; i < listOrder.length; i++){
          //     var result = listOrder[i];
              // var list = Object.keys(result.products.items)
              // //console.log(list);
              
              //   var index = list[0];
              //   // console.log(index);
              //   // console.log(result);
              //   // console.log("items:.....\n", result.products.items[index].item.name);
              //   // console.log(result.products.totalQty);
              //   // console.log(result.products.totalPrice);
              //   var priceSold =result.products.totalPrice;
              //   var numberSold = result.products.totalQty
              //   var update = result.update;

              //   list.forEach(function(e,i){
              //             var index = e;
              //             var item = result.products.items[index];
              //             var qty = result.products.items[index].qty;
              //             var price = result.products.items[index].qty;
                          
              //             console.log(i, item);
              //             // console.log("items:.....\n", result.products.items[index].item.name);
              //             if(item!=null){
              //                 Sold.saveDataSold(numberSold,priceSold,item.item._id, item.item.name,item.item.category, item.item.image,
              //                   qty,price,update,  function(err, result){

              //                 })
              //             }
                          
              //         })
          //   }
          // });
        //}
      //})
      res.render('pages/home/index', { title: 'Home' });
    }
    else
      res.redirect('/');
      res.render('pages/home/index', { title: 'Home' });
}
exports.users = function(req, res, next) {
  res.send('respond with a resource');
}

