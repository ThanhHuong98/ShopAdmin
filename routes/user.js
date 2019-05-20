var express = require('express');
var router = express.Router();
var user_controller = require('../controllers/customerController')
/* GET home page. */
router.get('/', user_controller.user);
module.exports = router;
