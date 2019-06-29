const express = require('express');

const shopController = require('../../controllers/shop');

const router = express.Router();

router.get('/cart', shopController.getCart);
router.post('/cart/add-product', shopController.addToCart);
router.post('/cart/remove-product', shopController.removeFromCart);
router.get('/checkout', shopController.getCheckout);

module.exports = router;