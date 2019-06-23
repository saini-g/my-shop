const getHome = (req, res, next) => {
    res.render('shop/index', { docTitle: 'My Shop', path: 'home' });
}

const getCart = (req, res, next) => {
    res.render('customer/cart', { docTitle: 'Cart', path: 'cart' });
}

module.exports = {
    getHome,
    getCart
};