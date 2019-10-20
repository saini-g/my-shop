const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    password: { type: String, required: true },
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