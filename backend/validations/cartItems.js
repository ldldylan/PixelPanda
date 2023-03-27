const { check } = require("express-validator");
const handleValidationErrors = require('./handleValidationErrors');
const mongoose = require('mongoose');
const CartItem = mongoose.model('CartItem');

const validateCartItemInput = [
    // check('user')
    //     .exists({ checkFalsy: false }),
    //  check('artwork')
    //      .exists({ checkFalsy: false }),
    
    check('artwork')
        .notEmpty()
        .withMessage('Artwork ID is required')
        .custom(async (artwork, { req }) => {
            const existingCartItem = await CartItem.findOne({ artwork }).exec();
            if (existingCartItem) {
                throw new Error('Artwork already exists in cart');
            }else{
                console.log(existingCartItem,"existingCartItem")
            }
        }),
    handleValidationErrors

];

module.exports = validateCartItemInput;