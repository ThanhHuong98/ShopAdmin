var Order = require('../models/order');
var async = require('async');
var Sold = require('../models/sold');
var Customer = require('../models/customer');

exports.index = async function(req, res, next) {
    const user = await req.user;
    if(user){
      var data=[];
      data.push(1);
      data.push(2);
      data.push(3);
      data.push(4);
          res.render('pages/home/index', { title: 'Home', datatest:data});
        }
    else
      res.redirect('/');
}
exports.users = function(req, res, next) {
  res.send('respond with a resource');
}

exports.listOrderSuccess = function(req, res, next){
    const passDate = req.params.update;
    console.log("update  order", passDate);

    Order.getlistOrderSuccessbyUpdate(passDate, function(err, result){
        if(err) {res.err(err);}
        console.log("LIST ORDER:", result);
        //res.end("OK")
        res.json(result);
    })
}

exports.listProductSold= function(req, res, next){

    const passDate = req.params.update;
    console.log("passDate", passDate);

     Sold.getListProductSold(passDate, function(err, result){
        if(err) {res.err(err);}
         console.log("LIST SOLD", result);
         //res.end("OK")
         res.json(result);
     })
}


exports.listUserRegister=function(req, res, next){
  const passDate = req.params.update;
    console.log("passDate", passDate);

     Customer.getListUserRegister(passDate, function(err, result){
        if(err) {res.err(err);}
         console.log("LIST USER", result);
         //res.end("OK")
         res.json(result);
     })
}
