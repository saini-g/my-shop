const mongodb = require('mongodb');

const { getDb } = require('../util/database');

module.exports = class User {

    constructor(username, email, id) {
        this.name = username;
        this.email = email;
        this._id = id ? new mongodb.ObjectId(id) : null;
    }

    save() {
        const db = getDb();

        if (this._id) {
            return db.collection('users').updateOne({ _id: this._id }, { $set: this });
        } else {
            return db.collection('users').insertOne(this);
        }
    }

    static findById(id) {
        const db = getDb();
        return db.collection('users').find({ _id: new mongodb.ObjectId(id) }).next();
    }
}