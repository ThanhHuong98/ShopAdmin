var Category = require('../models/category');

exports.category=function(req, res, next) {
    res.render('pages/category/category');
  }

  exports.addProduct = function(req, res, next){
    console.log('Product add: ',req.body);

    Category.addOne(req.body, function(err, result){
      if (err) { return next(err); }
      else{
       // res.redirect('./');
      }
    });
  }
exports.delete =function(req,res,next){
  
}
//   exports.addPost = async (req, res, next) => {
//     await product.add(req.body);
//     res.redirect('./');
// };

