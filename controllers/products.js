const Product = require('../models/product');

const getProducts = (req, res, next) => {

    Product.find()
        .then(products => {
            res.render('shop/products', {
                products: products,
                docTitle: 'Products',
                path: 'customer/products',
                isAdmin: false
            });
        })
        .catch(err => console.log(err));
}

const getProductById = (req, res, next) => {

    Product.findById(req.params.pid)
        .then(product => {
            res.render('shop/product-detail', {
                product: product,
                docTitle: `${product.title} - Details`,
                path: 'product-detail'
            });
        })
        .catch(err => console.log(err));
}

const getAdminProducts = (req, res, next) => {

    Product.find()
        .then(products => {
            res.render('shop/products', {
                products: products,
                docTitle: 'Products',
                path: 'admin/products',
                isAdmin: true
            });
        })
        .catch(err => console.log(err));
}

const getAddProduct = (req, res, next) => {
    res.render('admin/add-product', { docTitle: 'Add Product', path: 'add-product', isEdit: false });
}

const postAddProduct = (req, res, next) => {
    const prod = new Product({
        title: req.body.title,
        imageUrl: req.body.imageUrl,
        price: +req.body.price,
        description: req.body.description,
        created_by: req.user
    });
    prod.save()
        .then(result => {
            res.redirect('/admin/products');
        })
        .catch(err => console.log(err));
}

const getEditProduct = (req, res, next) => {

    Product.findById(req.params.pid)
        .then(product => {
            res.render('admin/add-product', {
                product: product,
                docTitle: `${product.title} - Edit`,
                path: 'edit-product',
                isEdit: true
            });
        })
        .catch(err => console.log(err));
}

const postEditProduct = (req, res, next) => {

    Product.findById(req.body.productId)
        .then(product => {
            product.title = req.body.title;
            product.imageUrl = req.body.imageUrl;
            product.price = +req.body.price;
            product.description = req.body.description;
            return product.save();
        })
        .then(result => res.redirect('/admin/products'))
        .catch(err => console.log(err));
}

const deleteProduct = (req, res, next) => {

    Product.findByIdAndRemove(req.body.productId)
        .then(() => {
            res.redirect('/admin/products');
        })
        .catch(err => console.log(err));
}

module.exports = {
    getProducts,
    getProductById,
    getAdminProducts,
    getAddProduct,
    postAddProduct,
    getEditProduct,
    postEditProduct,
    deleteProduct
};