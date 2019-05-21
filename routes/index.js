var express = require('express');
const app = express();
var router = express.Router();

var home_controller = require('../controllers/homeController')
var user_controller = require('../controllers/customerController')
var order_controller = require('../controllers/orderController')
var product_controller = require('../controllers/productController')
var category_controller = require('../controllers/categoryController')
var store_controller = require('../controllers/storeController')

const upload = require('../uploadMiddleware');
/* GET home page. */
router.get('/', home_controller.index);
router.get('/user',user_controller.user );
router.get('/user/edit', user_controller.edit);
router.get('/user/delete', user_controller.delete);
router.get('/order', order_controller.order );
router.get('/product',product_controller.product_list);
router.get('/product/delete/:id',product_controller.delete);

router.get('/category',category_controller.category);
router.get('/category/delete',category_controller.delete);
router.get('/category/edit', category_controller.edit);
router.get('category/create',category_controller.addCategory)

router.get('/store', store_controller.store);


//router.get('',product_controller.addProduct);
router.post('/product/add',upload.single('image'), product_controller.add);
router.post('/product/edit',upload.single('image'), product_controller.edit);

module.exports = router;

