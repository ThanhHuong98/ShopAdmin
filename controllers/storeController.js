var Store = require('../models/store');
const Resize = require('../resize');
var path = require('path');


exports.store = function(req, res, next) {
  Store.getAllStore(function(err, docs){
    if (err) 
    { return next(err); }
    else
    {
    res.render('pages/store/store', {listStore : result});
    }
  });
}

exports.addStore = function(req, res, next)
{
  var name = req.body.name;
  var describe = req.body.describe;
  var address = req.body.address;
  const imagePath = path.join(__dirname,'../public/template/images/products/');
    const fileUpload = new Resize(imagePath);
    if(!req.file){
      res.status(401).json({error: 'Please provide an image'});
    }
  const filename = await fileUpload.save(req.file.buffer);
  const image = "/template/images/categories/"+filename;

  Store.addStore(name, describe, image, address, function(err, result){
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

exports.editStore = function(req, res, next)
{
  var id = req.query.id;
  var name = req.body.name;
  var describe = req.body.describe;
  var address = req.body.address;
  const imagePath = path.join(__dirname,'../public/template/images/products/');
    const fileUpload = new Resize(imagePath);
    if(!req.file){
      res.status(401).json({error: 'Please provide an image'});
    }
  const filename = await fileUpload.save(req.file.buffer);
  const image = "/template/images/categories/"+filename;

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
  var id = req.query.id;
  Store.deleteStore(id, function(err, result){
    if(err)
    {
      return next(err);
    }
    else
    {
      res.redirect('/store');
    }
  })
}