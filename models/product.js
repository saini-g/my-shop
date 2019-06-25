const fs = require('fs');
const path = require('path');

const dbPath = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json');
let _pid = 1;

const readProducts = (cb) => {

    fs.readFile(dbPath, (err, content) => {

        if (err) {
            _pid = 1;
            return cb([]);
        }
        _pid = JSON.parse(content).length;
        cb(JSON.parse(content));
    });
}

const writeProduct = (prods) => {
    fs.writeFile(dbPath, prods, err => console.log('error saving to file', err));
}

module.exports = class Product {

    constructor(title, imageUrl, price, description) {
        this._id = _pid.toString();
        this.title = title;
        this.imageUrl = imageUrl;
        this.price = price;
        this.description = description;
        _pid += 1;
    }

    save() {

        readProducts(products => {
            products.push(this);
            writeProduct(JSON.stringify(products));
        });
    }

    static getAll(cb) {
        readProducts(cb);
    }

    static findById(id, cb) {
        readProducts(products => {
            const product = products.find(p => p._id === id);
            cb(product);
        });
    }
}