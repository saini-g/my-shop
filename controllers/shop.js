const Product = require('../models/product');
const User = require('../models/user');

const getHome = (req, res, next) => {
    res.render('shop/index', { docTitle: 'My Shop', path: 'home' });
}

const getCart = (req, res, next) => {

    req.user.getCartProducts()
        .then(products => {
            res.render('customer/cart', {
                docTitle: 'Cart',
                path: 'cart',
                products
            });
        })
        .catch(err => console.log(err));
}

const addToCart = (req, res, next) => {
    const prodId = req.body.productId;

    Product.findById(prodId)
        .then(product => {
            return req.user.addToCart(product);
        })
        .then(() => res.redirect('/cart'))
        .catch(err => console.log(err));
}

const removeFromCart = (req, res, next) => {
    const prodId = req.body.productId;

    req.user.removeFromCart(prodId)
        .then(() => res.redirect('/cart'))
        .catch(err => console.log(err));
}

/* const getCheckout = (req, res, next) => {
    res.render('customer/checkout', { docTitle: 'Checkout', path: 'checkout' });
} */

const getOrders = (req, res, next) => {
    req.user.getOrders()
        .then(orders => {
            res.render('customer/orders', { docTitle: 'Orders', path: 'orders', orders });
        })
        .catch(err => console.log(err));
    
}

const postOrder = (req, res, next) => {
    req.user.addOrder()
        .then(result => {
            res.redirect('/orders');
        })
        .catch(err => console.log(err));
}

module.exports = {
    getHome,
    getCart,
    getOrders,
    addToCart,
    removeFromCart,
    postOrder
};