var Store = require('../models/store');
var async = require('async');
const Resize = require('../resize');
var path = require('path');


exports.store = async function(req, res, next) {
  const user = await req.user;
  if(user){
    Store.getAllStore(function(err, docs){
      if (err) 
      { return next(err); }
      else
      {
      res.render('pages/store/store', {listStore : docs});
      }
    });
  }else
    res.redirect('/');
  
}

exports.addStore = async function(req, res, next)
{
  var name = req.body.name;
  var describe = req.body.describe;
  var address = req.body.address;

  console.log("Add new store: ")
  console.log("name:", name);
  console.log("describe:", describe);
  console.log("address:", address);

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
      Store.addStore(name, describe, image.url, address, function(err, result){
        if(err)
      {
        return next(err);
      }
      else
      {
        res.redirect('/store');
      }
    });
    }
  )
}

exports.editStore = async function(req, res, next)
{
  var id = req.body.id;
  var name = req.body.name;
  var describe = req.body.describe;
  var address = req.body.address;

  const imagePath = path.join(__dirname,'../public/template/images/stores/');
  const fileUpload = new Resize(imagePath);
  if(!req.file){
    res.status(401).json({error: 'Please provide an image'});
  }
  const filename = await fileUpload.save(req.file.buffer);
  const image =  "/template/images/stores/" + filename;

  Store.editStore(id, name, describe, image, address, function(err, result){
    if(err)
    {
      return next(err);
    }
    else
    {
      res.redirect('/store');
    }
  });
}

exports.deleteStore = function(req, res, next)
{
  const id= req.params.id;
  console.log("id store deleted:", id);

  Store.deleteStore(id, function(err, result){
    if(err)
    {
      return next(err);
    }
    else
    {
      res.redirect('/store');
      next();
    }
  })
}