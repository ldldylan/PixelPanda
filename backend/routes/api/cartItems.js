const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Artwork = mongoose.model('Artwork');
const CartItem = mongoose.model('CartItem');
const { requireUser } = require('../../config/passport');
const validateCartItemInput = require('../../validations/cartItems');
router.get('/', async (req, res) => {
  try {
    const cartItems = await CartItem.find()
      .populate("user", "artwork")
      .sort({ createdAt: -1 });
    return res.json(cartItems);
  }
  catch (err) {
    return res.json([]);
  }
});

router.get('/users/:userId', async (req, res, next) => {
  let user;
  try {
    user = await User.findById(req.params.userId);
  } catch (err) {
    const error = new Error('User not found');
    error.statusCode = 404;
    error.errors = { message: "No user found with that id" };
    return next(error);
  }
  try {
    const cartItems = await CartItem.find({ user: user._id })
      .sort({ createdAt: -1 })
      .populate("user", "_id username");
    return res.json(cartItems);
  }
  catch (err) {
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

router.post('/users/:userId', requireUser, validateCartItemInput, async (req, res, next) => {
  // console.log(req.body, "req.body")
  // console.log(req.params, "req.params")
  try {
    const newCartItem = new CartItem({
      user: req.params.userId,
      artwork: req.body.artwork
    });
    debugger
    let cartItem = await newCartItem.save();
    cartItem = await cartItem.populate('user', 'artwork');
    return res.json(cartItem);
  }
  catch (err) {
    next(err);
  }
});

// router.patch("/:id", async (req, res, next) => {
//     CartItem.findByIdAndUpdate(
//         req.params.id,
//         {
//             // quantity: req.body.quantity
//         },
//         { new: true }

//     )
//         .then((cartItem) => {
//             return res.json(cartItem);
//         })
//         .catch((err) => {
//             const error = new Error("CartItem can't be updated.");
//             error.statusCode = 422;
//             error.errors = { message: "Invalid cartItem input values." };
//             return next(error);
//         });
// })

router.delete("/:id", async (req, res, next) => {
  // res.json({ message: "DELETE /product" });
  // console.log(req.params)
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
})

router.delete("/users/:userId", async (req, res, next) => {
  try {
    const cartItems = await CartItem.find({ user: req.params.userId });
    if (cartItems.length === 0) {
      throw new Error('No cart items found for the user.');
    }
    cartItems.forEach(async (cartItem) => {
      await cartItem.deleteOne();
    });
    return res.json({ message: 'Cart items deleted successfully.' });
  } catch (err) {
    const error = new Error("Cart items can't be deleted.");
    error.statusCode = 422;
    error.errors = { message: err.message };
    return next(error);
  }
})
module.exports = router;