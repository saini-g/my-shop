const path = require('path');
const express = require('express');

const projectRoot = require('../../util/path');

const router = express.Router();

const productsList = [];

router.get('/add-product', (req, res, next) => {
    // res.sendFile(path.join(projectRoot, 'views', 'add-product.html'));
    res.render('add-product', { docTitle: 'Add Product', path: 'add-product' });
});

router.post('/add-product', (req, res, next) => {
    productsList.push({ title: req.body.title });
    res.redirect('/');
});

module.exports = {
    adminRouter: router,
    productsList: productsList
};