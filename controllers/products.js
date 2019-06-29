const Product = require('../models/product');
const Cart = require('../models/cart');

const getAddProduct = (req, res, next) => {
    res.render('admin/add-product', { docTitle: 'Add Product', path: 'add-product', isEdit: false });
}

const postAddProduct = (req, res, next) => {
    const prod = new Product(
        null,
        req.body.title,
        req.body.imageUrl,
        +req.body.price,
        req.body.description
    );
    prod.save();
    res.redirect('/admin/products');
}

const getEditProduct = (req, res, next) => {

    Product.findById(req.params.pid, product => {
        res.render('admin/add-product', {
            product: product,
            docTitle: `${product.title} - Edit`,
            path: 'edit-product',
            isEdit: true
        });
    });
}

const postEditProduct = (req, res, next) => {
    const updatedProduct = new Product(
        req.body.productId,
        req.body.title,
        req.body.imageUrl,
        +req.body.price,
        req.body.description
    );
    updatedProduct.save();
    res.redirect('/admin/products');
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

const deleteProduct = (req, res, next) => {
    const prodId = req.body.productId;

    Product.findById(prodId, product => {

        Cart.removeProduct({ id: product._id, price: product.price }, err => {

            if (err) {
                console.log(err);
                res.redirect('/admin/products');
            } else {

                Product.delete(prodId, error => {

                    if (error) {
                        console.log(error);
                    }
                    res.redirect('/admin/products');
                });
            }
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
    getProductById,
    deleteProduct
};