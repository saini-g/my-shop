const Product = require('../models/product');

const getAddProduct = (req, res, next) => {
    res.render('admin/add-product', { docTitle: 'Add Product', path: 'add-product' });
}

const postAddProduct = (req, res, next) => {
    const prod = new Product(
        req.body.title,
        req.body.imageUrl,
        +req.body.price,
        req.body.description
    );
    prod.save();
    res.redirect('/');
}

const getEditProduct = (req, res, next) => {

    Product.findById(req.params.pid, product => {
        res.render('admin/edit-product', {
            product: product,
            docTitle: `${product.title} - Edit`,
            path: 'edit-product'
        });
    });
}

const postEditProduct = (req, res, next) => {
    console.log('new title:', req.body.title);
    res.redirect('/');
}

const getProducts = (req, res, next) => {

    Product.getAll(products => {
        res.render('shop/products', {
            products: products,
            docTitle: 'Products',
            path: 'customer/products',
            isAdmin: false
        });
    });
}

const getAdminProducts = (req, res, next) => {

    Product.getAll(products => {
        res.render('shop/products', {
            products: products,
            docTitle: 'Products',
            path: 'admin/products',
            isAdmin: true
        });
    });
}

const getProductById = (req, res, next) => {

    Product.findById(req.params.pid, product => {
        res.render('shop/product-detail', {
            product: product,
            docTitle: `${product.title} - Details`,
            path: 'product-detail'
        });
    });
}

module.exports = {
    getAddProduct,
    postAddProduct,
    getProducts,
    getEditProduct,
    postEditProduct,
    getAdminProducts,
    getProductById
};