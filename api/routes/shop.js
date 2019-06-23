const path = require('path');
const express = require('express');

const rootDir = require('../../util/path');
const { productsList } = require('./admin');

const router = express.Router();

router.get('/', (req, res, next) => {
    // res.sendFile(path.join(rootDir, 'views', 'shop.html'));
    res.render('shop', { products: productsList, docTitle: 'My Shop', path: 'shop' });
});

module.exports = router;