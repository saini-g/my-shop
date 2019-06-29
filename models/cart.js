const fs = require('fs');
const path = require('path');

const dbPath = path.join(path.dirname(process.mainModule.filename), 'data', 'cart.json');

const readCart = cb => {

    fs.readFile(dbPath, (err, cartContent) => {
        let cart = { products: [], total: 0 };

        if (!err) {
            cart = JSON.parse(cartContent);
        }
        cb(cart);
    });
}

writeCart = (data, cb) => {

    fs.writeFile(dbPath, JSON.stringify(data), err => {
        cb(err);
    });
}

module.exports = class Cart {

    static addProduct(prod) {

        readCart(cart => {
            const existingProductIndex = cart.products.findIndex(p => p._id === prod.id);

            if (existingProductIndex !== -1) {
                cart.products[existingProductIndex].qty += 1;
            } else {
                cart.products.push({ _id: prod.id, qty: 1 });
            }
            cart.total += prod.price;
            writeCart(cart, err => console.log(err));
        });
    }

    static removeProduct(prod, cb) {

        readCart(cart => {
            const existingProductIndex = cart.products.findIndex(p => p._id === prod.id);

            if (existingProductIndex !== -1) {
                cart.total -= prod.price * cart.products[existingProductIndex].qty;
                cart.products = cart.products.filter(p => p._id !== prod.id);
                writeCart(cart, cb);
            } else {
                cb(null);
            }
        });
    }

    static getProducts(cb) {

        readCart(cart => {
            
            if (!cart.products || cart.products.length === 0) {
                return cb([], 0);
            }
            cb(cart.products, cart.total);
        });
    }
}