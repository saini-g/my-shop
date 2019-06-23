const Product = require('../models/product');

const getAddProduct = (req, res, next) => {
    res.render('add-product', { docTitle: 'Add Product', path: 'add-product' });
}

const postAddProduct = (req, res, next) => {
    const prod = new Product(req.body.title);
    prod.save();
    res.redirect('/');
}

const getProducts = (req, res, next) => {

    Product.getAll(products => {
        res.render('shop', { products: products, docTitle: 'My Shop', path: 'shop' });
    });
}

module.exports = {
    getAddProduct,
    postAddProduct,
    getProducts
};