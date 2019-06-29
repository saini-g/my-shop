const express = require('express');

const productsController = require('../../controllers/products');

const router = express.Router();

router.get('/add-product', productsController.getAddProduct);
router.post('/add-product', productsController.postAddProduct);

router.get('/edit-product/:pid', productsController.getEditProduct);
router.post('/edit-product', productsController.postEditProduct);

router.get('/products', productsController.getAdminProducts);

router.post('/delete-product', productsController.deleteProduct);

module.exports = router;