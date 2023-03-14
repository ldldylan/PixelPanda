const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Artwork = mongoose.model('Artwork');
const CartItem = mongoose.model('CartItem');
const { requireUser } = require('../../config/passport');
const validateArtworkInput = require('../../validations/artworks');

router.get('/', async (req, res) => {
  try {
    const cartItems = await CartItem.find()
                              .populate("author", "_id username")
                              .sort({ createdAt: -1 });
      return res.json(cartItems);
  }
  catch(err) {
    return res.json([]);
  }
});

router.get('/user/:userId', async (req, res, next) => {
  let user;
  try {
    user = await User.findById(req.params.userId);
  } catch(err) {
    const error = new Error('User not found');
    error.statusCode = 404;
    error.errors = { message: "No user found with that id" };
    return next(error);
  }
  try {
      const cartItems = await CartItem.find({ author: user._id })
                              .sort({ createdAt: -1 })
                              .populate("author", "_id username");
      return res.json(cartItems);
  }
  catch(err) {
    return res.json([]);
  }
})

// router.get('/:id', async (req, res, next) => {
//   try {
//       const cartItem = await CartItem.findById(req.params.id)
//                              .populate("author", "_id username");
//       return res.json(cartItems);
//   }
//   catch(err) {
//     const error = new Error('Cart item not found');
//     error.statusCode = 404;
//       error.errors = { message: "No cart item found with that id" };
//     return next(error);
//   }
// });

router.post('/', requireUser, validateArtworkInput, async (req, res, next) => {
  try {
      const newCartItem = new CartItem({
          artwork: req.body.artwork,
          quantity: req.body.quantity

    });
      let cartItem = await newCartItem.save();
      cartItem = await cartItem.populate('author', '_id username');
      return res.json(cartItem);
  }
  catch(err) {
    next(err);
  }
});

router.patch("/:id", async (req, res, next) => {
    CartItem.findByIdAndUpdate(
        req.params.id,
        {
            quantity: req.body.quantity
        },
        { new: true }

    )
        .then((cartItem) => {
            return res.json(cartItem);
        })
        .catch((err) => {
            const error = new Error("CartItem can't be updated.");
            error.statusCode = 422;
            error.errors = { message: "Invalid cartItem input values." };
            return next(error);
        });
})

router.delete("/:id", async (req, res, next) => {
    // res.json({ message: "DELETE /product" });

    CartItem.findByIdAndDelete(req.params.id)
        .then((cartItem) => {
            return res.json(cartItem);
        })
        .catch((err) => {
            const error = new Error("CartItem can't be deleted.");
            error.statusCode = 422;
            error.errors = { message: "CartItem can't be found." };
            return next(error);
        });
});
module.exports = router;