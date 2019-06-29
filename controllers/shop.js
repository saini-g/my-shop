const Product = require('../models/product');
const Cart = require('../models/cart');

const getHome = (req, res, next) => {
    res.render('shop/index', { docTitle: 'My Shop', path: 'home' });
}

const getCart = (req, res, next) => {

    Cart.getProducts((products, totalPrice) => {
        const cartProducts = [];

        if (products.length > 0) {

            Product.getAll(allProducts => {

                for (let prod of allProducts) {
                    const cartProd = products.find(p => p._id === prod._id);

                    if (cartProd) {
                        cartProducts.push({ ...prod, qty: cartProd.qty });
                    }
                }
                res.render('customer/cart', { docTitle: 'Cart', path: 'cart', products: cartProducts, totalPrice });
            });
        } else {
            res.render('customer/cart', { docTitle: 'Cart', path: 'cart', products: cartProducts, totalPrice });
        }
    });
}

const addToCart = (req, res, next) => {
    const prodId = req.body.productId;

    Product.findById(prodId, product => {
        Cart.addProduct({ id: product._id, price: product.price });
        res.redirect('/cart');
    });
}

const removeFromCart = (req, res, next) => {
    const prodId = req.body.productId;

    Product.findById(prodId, product => {
        Cart.removeProduct({ id: product._id, price: product.price });
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
    addToCart,
    removeFromCart
};