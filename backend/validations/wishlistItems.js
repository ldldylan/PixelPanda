const { check } = require("express-validator");
const handleValidationErrors = require('./handleValidationErrors');
const mongoose = require('mongoose');
const WishlistItem = mongoose.model('WishlistItem');

const validateWishlistItemInput = [
    // check('user')
    //     .exists({ checkFalsy: false }),
    //  check('artwork')
    //      .exists({ checkFalsy: false }),

    check('artwork')
        .notEmpty()
        .withMessage('Artwork ID is required')
        .custom(async (artwork, { req }) => {
            const existingWishlistItem = await WishlistItem.findOne({ artwork }).exec();
            if (existingWishlistItem) {
                throw new Error('Artwork already exists in cart');
            } else {
                console.log(existingWishlistItem, "existingWishlistItem")
            }
        }),
    handleValidationErrors

];

module.exports = validateWishlistItemInput;