const Product = require('../models/product');
const Order = require('../models/order');

const getHome = (req, res, next) => {
    res.render('shop/index', { docTitle: 'My Shop', path: 'home' });
}

const getCart = (req, res, next) => {

    req.user.populate('cart.products.product_id').execPopulate()
        .then(user => {
            res.render('customer/cart', {
                docTitle: 'Cart',
                path: 'cart',
                products: user.cart.products
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

const getOrders = (req, res, next) => {

    Order.find({ 'user.user_id': req.user._id })
        .then(orders => {
            res.render('customer/orders', {
                docTitle: 'Orders',
                path: 'orders',
                orders
            });
        })
        .catch(err => console.log(err));
}

const postOrder = (req, res, next) => {
    
    req.user.populate('cart.products.product_id').execPopulate()
        .then(user => {
            const products = user.cart.products.map(p => {
                return { qty: p.qty, product: { ...p.product_id._doc } };
            });
            const newOrder = new Order({
                user: { name: req.user.name, user_id: req.user._id },
                products
            });
            return newOrder.save();
        })
        .then(result => {
            return req.user.clearCart();
        })
        .then(result => res.redirect('/orders'))
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