const productsList = [];

const getAddProduct = (req, res, next) => {
    res.render('add-product', { docTitle: 'Add Product', path: 'add-product' });
}

const postAddProduct = (req, res, next) => {
    productsList.push({ title: req.body.title });
    res.redirect('/');
}

const getProducts = (req, res, next) => {
    res.render('shop', { products: productsList, docTitle: 'My Shop', path: 'shop' });
}

module.exports = {
    getAddProduct,
    postAddProduct,
    getProducts
};