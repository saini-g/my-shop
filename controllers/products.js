const Product = require('../models/product');

const getProducts = (req, res, next) => {

    Product.getAll()
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

    Product.getAll()
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
    const prod = new Product(
        req.body.title,
        req.body.imageUrl,
        +req.body.price,
        req.body.description,
        null,
        req.user._id
    );
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
    const updatedProduct = new Product(
        req.body.title,
        req.body.imageUrl,
        +req.body.price,
        req.body.description,
        req.body.productId
    );
    updatedProduct.save()
        .then(result => {
            res.redirect('/admin/products');
        })
        .catch(err => console.log(err));
}

const deleteProduct = (req, res, next) => {

    Product.delete(req.body.productId)
        .then(() => {
            res.redirect('/admin/products');
        })
        .catch(err => console.log(err));

    /* Product.findById(req.body.productId, product => {

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
    }); */
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