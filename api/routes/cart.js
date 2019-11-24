const express = require('express');

const shopController = require('../../controllers/shop');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/cart', isAuth, shopController.getCart);
router.post('/cart/add-product', isAuth, shopController.addToCart);
router.post('/cart/remove-product', isAuth, shopController.removeFromCart);
router.get('/orders', isAuth, shopController.getOrders);
router.post('/post-order', isAuth, shopController.postOrder);

module.exports = router;