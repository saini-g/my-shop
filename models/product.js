const fs = require('fs');
const path = require('path');

const dbPath = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json');

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
    fs.writeFile(dbPath, JSON.stringify(prods), err => console.log('error saving to file', err));
}

module.exports = class Product {

    constructor(id, title, imageUrl, price, description) {
        this._id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.price = price;
        this.description = description;
    }

    save() {

        readProducts(products => {

            if (this._id) {
                const prodIndex = products.findIndex(p => p._id === this._id);
                products[prodIndex] = this;
            } else {
                this._id = Math.random().toString();
                products.push(this);
            }
            writeProduct(products);
        });
    }

    static delete(id) {

        readProducts(products => {
            const updatedProducts = products.filter(p => p._id !== id);
            writeProduct(updatedProducts);
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