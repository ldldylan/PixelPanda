const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const wishlistItemSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    artwork: {
        type: Schema.Types.ObjectId,
        ref: 'Artwork'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('WishlistItem', wishlistItemSchema);