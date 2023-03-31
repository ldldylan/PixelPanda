const { check } = require("express-validator");
const handleValidationErrors = require('./handleValidationErrors');

// middleware to validate the keys in the body of a request to create/edit
const validateArtworkInput = [
  check('name')
    .exists({ checkFalsy: true })
    .isLength({ min: 0, max: 30 })
    .withMessage('Artwork name must be between 0 and 140 characters'),
  
  check('description')
    // .exists({ checkFalsy: true })
    .isLength({ min: 0, max: 140 })
    .withMessage('Artwork description must be between 0 and 140 characters'),

  check('price')
    .exists({ checkFalsy: true })
    .isFloat({ min: 0, max: 1000000 }),

  handleValidationErrors
  

];

module.exports = validateArtworkInput;