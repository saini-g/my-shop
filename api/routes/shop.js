const express = require('express');

const shopController = require('../../controllers/shop');
const productsController = require('../../controllers/products');

const router = express.Router();

router.get('/', shopController.getHome);
router.get('/products', productsController.getProducts);
router.get('/cart', shopController.getCart);
router.get('/checkout', shopController.getCheckout);
router.get('/orders', shopController.getOrders);
router.get('/products/:pid', productsController.getProductById);

module.exports = router;