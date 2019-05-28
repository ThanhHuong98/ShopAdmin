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
router.get('/', user_controller.login);
router.post('/',user_controller.verifyAccount);

router.get('/home', home_controller.index);
router.get('/user',user_controller.user );
router.post('/user/edit', user_controller.edit);
router.post('/user/autho',user_controller.userAutho);

router.get('/user/delete/:id', user_controller.delete);
router.get('/order', order_controller.order );
router.get('/order/update', order_controller.updateStatus);

router.get('/product',product_controller.product_list);
router.get('/product/delete/:id',product_controller.delete);
router.post('/product/add',upload.single('image'), product_controller.add);
router.post('/product/edit',upload.single('image'), product_controller.edit);

router.get('/category',category_controller.category);
router.post('/category/create',upload.single('image'),category_controller.addCategory);
router.get('/category/delete/:id',category_controller.delete);
router.post('/category/edit', upload.single('image'),category_controller.edit);

router.get('/store', store_controller.store);
router.post('/store/add',upload.single('image'), store_controller.addStore);
router.post('/store/edit',upload.single('image'), store_controller.editStore);
router.get('/store/delete/:id', store_controller.deleteStore);


module.exports = router;

