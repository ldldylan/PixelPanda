const express  = require('express');
const Stripe = require('stripe');
require("dotenv").config();
const stripe = Stripe(process.env.STRIPE_SECRET_ACCESS_KEY);

const router = express.Router();

router.post('/', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: req.body.cartItems.map(cartItem => {
        return {
            price_data: {
                currency: 'usd',
                product_data: {
                    name: cartItem.name,
                    images: [cartItem.ArtworkImageUrl],
                },
                unit_amount: cartItem.price * 100,
            },
            adjustable_quantity: {
                enabled: false,
            },
            quantity: 1,
        }
    }),
    submit_type: 'pay',
    mode: 'payment',
    payment_method_types: ['card'],
    success_url: `${process.env.CLIENT_URL}/checkout`,
    cancel_url: `${process.env.CLIENT_URL}/fail`,
    });
    res.send(session);
});
module.exports = router;