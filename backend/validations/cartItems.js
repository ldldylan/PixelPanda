const { check } = require("express-validator");
const handleValidationErrors = require('./handleValidationErrors');
const mongoose = require('mongoose');
const CartItem = mongoose.model('CartItem');
debugger
const validateCartItemInput = [
    // check('artwork')
    //     .notEmpty()
    //     .withMessage('Artwork ID is required')
    //     .custom(async (artwork, { req }) => {
    //         const currentUserID = req.user.id;
            
    //         const existingCartItem = await CartItem.findOne({ artwork }).exec();
    //         debugger
    //         if (existingCartItem && existingCartItem.userId.toString() === currentUserID) {
    //             throw new Error('Artwork already exists in cart');
    //         }
    //     }),
    handleValidationErrors
];

module.exports = validateCartItemInput;