const express = require('express');

const shopController = require('../../controllers/shop');
const productsController = require('../../controllers/products');

const router = express.Router();

router.get('/', shopController.getHome);
router.get('/products', productsController.getProducts);
router.get('/products/:pid', productsController.getProductById);
// router.get('/orders', shopController.getOrders);

module.exports = router;