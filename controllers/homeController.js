var Order = require('../models/order');
var async = require('async');
var Sold = require('../models/sold');
var Customer = require('../models/customer');

exports.index = async function(req, res, next) {
    const user = await req.user;
    if(user){
          res.render('pages/home/index', { title: 'Home'});
        }
    else
      res.redirect('/');
}
exports.users = function(req, res, next) {
  res.send('respond with a resource');
}


exports.listOrderSuccess = function(req, res, next){
    const passDate = req.params.update;
    //console.log("update  order", passDate);

    Order.getlistOrderSuccessbyUpdate(passDate, function(err, result){
        if(err) {res.err(err);}
       // console.log("LIST ORDER:", result);
        //res.end("OK")
        res.json(result);
    })
}
exports.listProductSold= function(req, res, next){

    const passDate = req.params.update;
    //console.log("passDate", passDate);

     Sold.getListProductSold(passDate, function(err, result){
        if(err) {res.err(err);}
        // console.log("LIST SOLD", result);
         //res.end("OK")
         res.json(result);
     })
}


exports.listUserRegister=function(req, res, next){
  const passDate = req.params.update;
   // console.log("passDate", passDate);

     Customer.getListUserRegister(passDate, function(err, result){
        if(err) {res.err(err);}
         console.log("LIST USER", result);
         //res.end("OK")
         res.json(result);
     })
}

exports.getDataSetChart= async function(req,res, next){

  await Sold.getDataChart(function(err, result){
    if(err) {res.err(err);}
   // console.log("Data test CHART", result);
    res.json(result);
  })
    // var data = [];
    // for(var i =14; i < 19 ;i ++){
    //   data.push(i);
    // }
    //   console.log("Data test CHART", data);
    //  res.json(data);
}