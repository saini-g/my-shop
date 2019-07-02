const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;
let _db;

const mongoConnection = cb => {
    MongoClient
        .connect(
            'mongodb+srv://gaurav-saini:gaurav-saini@slackedge-test-skasp.mongodb.net/my-shop?retryWrites=true&w=majority',
            { useNewUrlParser: true }
        )
        .then(client => {
            console.log('connected to mongodb')
            _db = client.db();
            cb();
        })
        .catch(err => {
            console.log(err);
        });
}

const getDb = () => {

    if (_db) {
        return _db;
    }
    throw new Error('error connecting to db');
}

module.exports = {
    mongoConnection,
    getDb
};