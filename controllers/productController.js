var Product = require('../models/product');
var Category = require('../models/category');
var async = require('async');
var path = require('path');

exports.product = function (req, res, next) {
  res.render('pages/product/product');
}

exports.product_list = async function (req, res, next) {
  const user = await req.user;
  if (user) {
    async.parallel({
      listCategory: function (cb) {
        Category.getAllCategory(cb);
      },
      listProduct: function (cb) {
        Product.all(cb);
      }
    }, function (err, result) {
      if (err) {
        res.err(err);
      } else {
        res.render('pages/product/product', { listCategory: result.listCategory, listProduct: result.listProduct })
      }
    })
  } else
    res.redirect('/');

}

exports.add = async function (req, res, next) {
  const name = req.body.name;
  const info = req.body.info;
  const category = req.body.category;
  const price = req.body.price;
  const quantity = req.body.quantity;
  if (!req.file) {
    res.status(401).json({ error: 'Please provide an image' });
  }
  const uniqueFilename = new Date().toISOString();
  const cloudinary = require('cloudinary').v2;
  cloudinary.config({
    cloud_name: 'hcm-universityofsciences',
    api_key: '573961923829453',
    api_secret: 'O4itI9lytPLnkderxnT7uG7qHDM'
  })
  cloudinary.uploader.upload(
    "data:image/png;base64,"+(req.file.buffer).toString('base64'),
    { public_id: 'blog/'+uniqueFilename, tags: 'product'}, // directory and tags are optional
    function (err, image) {
      if (err) {
        return res.send(err)
      }
      Product.add(name, info, category, price, quantity, image.url, function (err, result) {
        if (err) {
          res.err(err);
        } else {
          res.redirect('/product');
        }
      })
    }
  )
  
}

exports.edit = async function (req, res, next) {
  const id = req.body.id;
  const name = req.body.name;
  const info = req.body.info;
  const category = req.body.category;
  const price = req.body.price;
  const quantity = req.body.quantity;
  if (!req.file) {
    res.status(401).json({ error: 'Please provide an image' });
  }
  const cloudinary = require('cloudinary').v2;
  cloudinary.config({
    cloud_name: 'hcm-universityofsciences',
    api_key: '573961923829453',
    api_secret: 'O4itI9lytPLnkderxnT7uG7qHDM'
  });
  const uniqueFilename = new Date().toISOString();
  cloudinary.uploader.upload(
    "data:image/png;base64,"+(req.file.buffer).toString('base64'),
    {public_id: 'blog/'+uniqueFilename, tags: 'product'}, // directory and tags are optional
    function (err, image) {
      if (err) {
        return res.send(err)
      }
      Product.edit(id, name, info, category, price, quantity, image.url, function (err, result) {
        if (err) {
          res.err(err);
        } else {
          res.redirect('/product');
        }
      })
    }
  )
  
}

exports.delete = function (req, res, next) {
  const id = req.params.id;
  console.log(id);
  Product.delete(id, function (err, result) {
    if (err) {
      res.err(err);
    } else {
      res.redirect('/product');
      next();
    }
  })
}



