const express = require('express');

const productsController = require('../../controllers/products');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/products', isAuth, productsController.getAdminProducts);
router.get('/add-product', isAuth, productsController.getAddProduct);
router.post('/add-product', isAuth, productsController.postAddProduct);
router.get('/edit-product/:pid', isAuth, productsController.getEditProduct);
router.post('/edit-product', isAuth, productsController.postEditProduct);
router.post('/delete-product', isAuth, productsController.deleteProduct);

module.exports = router;