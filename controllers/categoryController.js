var Category = require('../models/category');

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

exports.addCategory = function (req, res, next) {
  console.log('Category add: ', req.body);

  Category.addCategory(req.body, function (err, result) {
    if (err) { return next(err); }
    else {
      res.redirect('./category');
    }
  });
}

exports.delete = function (req, res, next) {
  Category.deleteCategory(req.query.id, function (err, result) {
    if (err) { return next(err); }
    else {
      res.redirect('./category');
    }
  });
}

exports.edit = function (req, res, next) {
  Category.editCategory(req.query.id, req.body, function (err, result) {
    if (err) { return next(err); }
    else {
      res.redirect('./category');
    }
  });
}

