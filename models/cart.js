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

writeCart = data => {

    fs.writeFile(dbPath, JSON.stringify(data), err => {

        if (err) {
            console.log('error saving cart', err);
        }
    });
}

module.exports = class Cart {

    static addProduct(prod) {

        readCart(cart => {
            const existingProductIndex = cart.products.findIndex(p => p._id === prod._id);

            if (existingProductIndex !== -1) {
                cart.products[existingProductIndex].qty += 1;
            } else {
                cart.products.push({ ...prod, qty: 1 });
            }
            cart.total += prod.price;
            writeCart(cart);
        });
    }
}