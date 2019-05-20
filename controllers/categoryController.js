var Category = require('../models/category');
const Resize = require('../resize');
var path = require('path');

exports.category = function (req, res, next){
  Category.getAllCategory(function(err, docs){
    if (err) 
    { return next(err); }
    else
    {
      console.log(docs);
      res.render('pages/category/category', {listCategory: docs});
    }
  });
}

  exports.addCategory = function(req, res, next){

    var code = req.body.code;
    var name = req.body.name;

    // const imagePath = path.join(__dirname,'../public/template/images/products/');
    // const fileUpload = new Resize(imagePath);
    // if(!req.file){
    //   res.status(401).json({error: 'Please provide an image'});
    // }
    // const filename = await fileUpload.save(req.file.buffer);
    // const image = "/template/images/categories/"+filename;
     Category.addCategory(name, code, "", function(err,result){
       if(err){
         res.err(err);
       }else{
         res.redirect('/category');
       }
     });
  }

  exports.delete = function (req, res, next) {
    Category.deleteCategory(req.query.id, function (err, result) {
      if (err) { return next(err); }
      else {
        res.redirect('/category');
      }
    });
  }
  
  exports.edit = function (req, res, next) {
    var code = req.body.code;
    var name = req.body.name;
    // const imagePath = path.join(__dirname,'../public/template/images/products/');
    // const fileUpload = new Resize(imagePath);
    // const filename = await fileUpload.save(req.file.buffer);
    // const image = "/template/images/categories/"+filename;
    //
     Category.editCategory(req.query.id, name, code, "", function (err, result) {
       if (err) { return next(err); }
       else {
         res.redirect('/category');
       }
   });
  }

