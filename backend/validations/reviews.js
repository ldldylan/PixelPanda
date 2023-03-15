const { check } = require("express-validator");
const handleValidationErrors = require('./handleValidationErrors');


const validateReviewInput = [
    check('rating')
        .optional()
        .isInt({ min: 1, max: 5 })
        .withMessage('Artwork rating must be between 1 and 5'),
    handleValidationErrors

];

module.exports = validateReviewInput;