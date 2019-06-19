var Category = require('../models/category');
const Resize = require('../resize');
var path = require('path');

exports.category = async function (req, res, next){
  const user = await req.user;
  if(!user){
    res.redirect('/');
  }else{
      Category.getAllCategory(function(err, docs){
      if (err) 
      { return next(err); }
      else
      {
        res.render('pages/category/category', {listCategory: docs});
      }
    });
  }
}

  exports.addCategory = async function(req, res, next){

    var code = req.body.code;
    var name = req.body.name;

    console.log("name:", name);
    console.log("code:", code);

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
      { public_id: 'blog/'+uniqueFilename, tags: 'category'}, // directory and tags are optional
      function (err, image) {
        if (err) {
          return res.send(err)
        }
        Category.addCategory(name, code, image.url, function(err,result){
          if(err){
            res.err(err);
          }else{
            res.redirect('/category');
          }
        });
      }
    )
  }

  exports.delete = function (req, res, next) {

    const id= req.params.id;
    console.log(id);

    Category.deleteCategory(id, function (err, result) {
      if (err) { return next(err); }
      else {
        res.redirect('/category');
        next();
      }
    });
  }
  
  exports.edit = async function (req, res, next) {

    const id = req.body.id;
    var code = req.body.code;
    var name = req.body.name;

    console.log("Edit 1 category");

    console.log(name);
    console.log(code);
    console.log("id = ", id);
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
      { public_id: 'blog/'+uniqueFilename, tags: 'category'}, // directory and tags are optional
      function (err, image) {
        if (err) {
          return res.send(err)
        }
        Category.editCategory(id, name, code, image.url, function (err, result) {
          if (err) { return next(err); }
          else {
            res.redirect('/category');
          }
        });
      }
    )
  }
