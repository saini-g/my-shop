const getHome = (req, res, next) => {
    res.render('shop/index', { docTitle: 'My Shop', path: 'home' });
}

const getCart = (req, res, next) => {
    res.render('customer/cart', { docTitle: 'Cart', path: 'cart' });
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
    getOrders
};