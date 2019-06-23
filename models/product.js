const fs = require('fs');
const path = require('path');

const dbPath = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json');
let _pid = 1;

const readProducts = (cb) => {

    fs.readFile(dbPath, (err, content) => {

        if (err) {
            return cb([]);
        }
        cb(JSON.parse(content));
    });
}

const writeProduct = (prods) => {
    fs.writeFile(dbPath, prods, err => console.log('error saving to file', err));
}

module.exports = class Product {

    constructor(title, imageUrl, price, description) {
        this._id = _pid;
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
}