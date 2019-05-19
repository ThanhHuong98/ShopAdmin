var Product = require('../models/product');
var Category = require('../models/category');

exports.product=function(req, res, next) {
    res.render('pages/product/product');
  }

  exports.addProduct = function(req, res, next){
    console.log('Product add: ',req.body);

    Product.addOne(req.body, function(err, result){
      if (err) { return next(err); }
      else{
       // res.redirect('./');
      }
    });
  }

//   exports.addPost = async (req, res, next) => {
//     await product.add(req.body);
//     res.redirect('./');
// };

