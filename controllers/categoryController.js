var Category = require('../models/category');
const Resize = require('../resize');
var path = require('path');

exports.category = function (req, res, next){
  Category.getAllCategory(function(err, docs){
    if (err) 
    { return next(err); }
    else
    {
      res.render('pages/category/category', {listCategory: docs});
    }
  });
}

  exports.addCategory = async function(req, res, next){

    var code = req.body.code;
    var name = req.body.name;

    console.log("name:", name);
    console.log("code:", code);

    const imagePath = path.join(__dirname,'../public/template/images/categories/');
    const fileUpload = new Resize(imagePath);
    if(!req.file){
      res.status(401).json({error: 'Please provide an image'});
    }
    const filename = await fileUpload.save(req.file.buffer);
    const image = "/template/images/categories/" + filename;

    console.log("image:", image);

    Category.addCategory(name, code, "", function(err,result){
      if(err){
        res.err(err);
      }else{
        res.redirect('/category');
      }
    });
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



    const imagePath = path.join(__dirname,'../public/template/images/categories/');
    const fileUpload = new Resize(imagePath);
    if(!req.file){
      res.status(401).json({error: 'Please provide an image'});
    }
    const filename = await fileUpload.save(req.file.buffer);
    const image = "/template/images/categories/"+filename;

    Category.editCategory(id, name, code, image, function (err, result) {
      if (err) { return next(err); }
      else {
        res.redirect('/category');
      }
    });
  }
