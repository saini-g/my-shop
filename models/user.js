const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    cart: {
        products: [{
            product_id: { type: Schema.Types.ObjectId, required: true, ref: 'Product' },
            qty: { type: Number, required: true }
        }]
    }
});

userSchema.methods.addToCart = function(product) {
    const cartProducts = [ ...this.cart.products ];
    const existingProductIndex = cartProducts.findIndex(p => p.product_id.toString() === product._id.toString());

    if (existingProductIndex >= 0) {
        cartProducts[existingProductIndex].qty += 1;
    } else {
        cartProducts.push({ product_id: product._id, qty: 1 });
    }
    this.cart = { products: cartProducts };
    return this.save();
}

userSchema.methods.removeFromCart = function(productId) {
    const updatedCartProducts = this.cart.products.filter(cp => cp.product_id.toString() !== productId.toString());
    this.cart = { products: updatedCartProducts };
    return this.save();
}

userSchema.methods.addOrder = function() {
    const updatedCartProducts = this.cart.products.filter(cp => cp.product_id.toString() !== productId.toString());
    this.cart = { products: updatedCartProducts };
    return this.save();
}

userSchema.methods.clearCart = function() {
    this.cart = { products: [] };
    return this.save();
}

module.exports = mongoose.model('User', userSchema);

/* module.exports = class User {

    constructor(username, email, id, cart) {
        this.name = username;
        this.email = email;
        this._id = id ? new mongodb.ObjectId(id) : null;
        this.cart = cart;
    }

    save() {
        const db = getDb();

        if (this._id) {
            return db.collection('users').updateOne({ _id: this._id }, { $set: this });
        } else {
            return db.collection('users').insertOne(this);
        }
    }

    addToCart(product) {
        const db = getDb();
        const updatedCart = this.cart ? this.cart : { products: [] };
        const existingProductIndex = updatedCart.products.findIndex(p => p._id.toString() === product._id.toString());

        if (existingProductIndex >= 0) {
            updatedCart.products[existingProductIndex].qty += 1;
        } else {
            updatedCart.products.push({ _id: product._id, qty: 1 });
        }
        return db.collection('users').updateOne({ _id: this._id }, { $set: { cart: updatedCart } });
    }

    removeFromCart(productId) {
        const db = getDb();

        const updatedCartProducts = this.cart.products.filter(cp => {
            return cp._id.toString() !== productId.toString();
        });
        return db.collection('users').updateOne({ _id: this._id }, { $set: { cart: { products: updatedCartProducts } } });
    }

    getCartProducts() {
        const productIds = this.cart.products.map(p => p._id);
        const db = getDb();
        return db.collection('products').find({ _id: { $in: productIds } }).toArray()
            .then(products => {
                return products.map(prod => {
                    return {
                        ...prod,
                        qty: this.cart.products.find(cp => cp._id.toString() === prod._id.toString()).qty
                    };
                });
            })
            .catch(err => console.log(err));
    }

    addOrder() {
        const db = getDb();
        return this.getCartProducts()
            .then(products => {
                const newOrder = {
                    products: products,
                    user: {
                        _id: new mongodb.ObjectId(this._id),
                        name: this.name
                    }
                };
                return db.collection('orders').insertOne(newOrder);
            })
            .then(result => {
                this.cart = { products: [] };
                return db.collection('users').updateOne({ _id: this._id }, { $set: { cart: { products: [] } } }); 
            });
    }

    getOrders() {
        const db = getDb();
        return db.collection('orders').find({ 'user._id': new mongodb.ObjectId(this._id) }).toArray();
    }

    static findById(id) {
        const db = getDb();
        return db.collection('users').find({ _id: new mongodb.ObjectId(id) }).next();
    }
} */