const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({ 
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    artworkId: {
        type: Schema.Types.ObjectId,
        ref: 'Artwork'
    },
    content: {
        type: String,
        required: false
    },
    rating: {
        type: Number,
        require: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Review', reviewSchema);