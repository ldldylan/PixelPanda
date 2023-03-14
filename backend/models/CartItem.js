const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartItemSchema = new Schema({
    artwork: {
        type: Schema.Types.ObjectId,
        ref: 'Artwork'
    },
    quantity: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('CartItem', cartItemSchema);