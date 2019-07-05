const mongodb = require('mongodb');

const { getDb } = require('../util/database');

module.exports = class Product {

    constructor(title, imageUrl, price, description, id, userId) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.price = price;
        this.description = description;
        this._id = id ? new mongodb.ObjectId(id) : null;
        
        if (userId) {
            this.created_by = new mongodb.ObjectId(userId);
        }
    }

    save() {
        const db = getDb();

        if (this._id) {
            return db.collection('products').updateOne({ _id: this._id }, { $set: this });
        } else {
            return db.collection('products').insertOne(this);
        }
    }

    static getAll() {
        const db = getDb();
        return db.collection('products').find().toArray();
    }

    static findById(id) {
        const db = getDb();
        return db.collection('products').find({ _id: new mongodb.ObjectId(id) }).next();
    }

    static delete(id) {
        const db = getDb();
        return db.collection('products').deleteOne({ _id: new mongodb.ObjectId(id) });
    }
}