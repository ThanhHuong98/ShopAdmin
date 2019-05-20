var express = require('express');
var router = express.Router();
var home_controller = require('../controllers/homeController')
var user_controller = require('../controllers/userController')
var order_controller = require('../controllers/orderController')
var product_controller = require('../controllers/productController')
var category_controller = require('../controllers/categoryController')
var store_controller = require('../controllers/storeController')
/* GET home page. */
router.get('/', home_controller.index);
router.get('/user',user_controller.user );
router.get('/order', order_controller.order );
router.get('/product',product_controller.product);
router.get('/category',category_controller.category);
router.get('/category/delete',category_controller.delete);
router.get('/category/edit', category_controller.edit);
router.get('/store', store_controller.store);

//router.get('',product_controller.addProduct);


module.exports = router;

