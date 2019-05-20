var Product = require('../models/product');
var Category = require('../models/category');
var async = require('async');
const Resize = require('../resize');
var path = require('path');

exports.product = function (req, res, next) {
  res.render('pages/product/product');
}

exports.product_list = function(req,res,next){
  async.parallel({
    listCategory: function(cb){
      Category.getAllCategory(cb);
    },
    listProduct: function(cb){
      Product.all(cb);
    }
  },function(err,result){
    if(err){
      res.err(err);
    }else{
      res.render('pages/product/product',{listCategory: result.listCategory,listProduct: result.listProduct})
    }
  })
}
exports.add =  async function(req,res,next){  
  const name = req.body.name;
  const info = req.body.info;
  const category = req.body.category;
  const price = req.body.price;
  const quantity = req.body.quantity;
  
  const imagePath = path.join(__dirname,'../public/template/images/products/');
  const fileUpload = new Resize(imagePath);
  if(!req.file){
    res.status(401).json({error: 'Please provide an image'});
  }
  const filename = await fileUpload.save(req.file.buffer);
  const image = "/template/images/products/"+filename;
  Product.add(name,info,category,price,quantity,image,function(err,result){
    if(err){
      res.err(err);
    }else{
      res.redirect('/product');
    }
  })
}

exports.edit = async function(req,res,next){
  const id = req.body.id;
  const name = req.body.name;
  const info = req.body.info;
  const category = req.body.category;
  const price = req.body.price;
  const quantity = req.body.quantity;
  //
  const imagePath = path.join(__dirname,'../public/template/images/products/');
  const fileUpload = new Resize(imagePath);
  if(!req.file){
    res.status(401).json({error: 'Please provide an image'});
  }
  const filename = await fileUpload.save(req.file.buffer);
  const image = "/template/images/products/"+filename;
  Product.edit(id,name,info,category,price,quantity,image,function(err,result){
    if(err){
      res.err(err);
    }else{
      res.redirect('/product');
    }
  })
}

exports.delete = function(req,res,next){
  const id= req.params.id;
  console.log(id);
  Product.delete(id,function(err,result){
    if(err){
      res.err(err);
    }else{
      res.redirect('/product');
      next();
    }
  })
}



