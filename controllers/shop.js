const Product = require('../models/product');
const Cart = require('../models/cart');

const getHome = (req, res, next) => {
    res.render('shop/index', { docTitle: 'My Shop', path: 'home' });
}

const getCart = (req, res, next) => {
    res.render('customer/cart', { docTitle: 'Cart', path: 'cart' });
}

const postCart = (req, res, next) => {
    const prodId = req.body.productId;

    Product.findById(prodId, product => {
        Cart.addProduct(product);
        res.redirect('/cart');
    });
}

const getCheckout = (req, res, next) => {
    res.render('customer/checkout', { docTitle: 'Checkout', path: 'checkout' });
}

const getOrders = (req, res, next) => {
    res.render('customer/orders', { docTitle: 'My Orders', path: 'orders' });
}

module.exports = {
    getHome,
    getCart,
    getCheckout,
    getOrders,
    postCart
};