const express = require('express');
const Stripe = require('stripe');
require("dotenv").config();
const stripe = Stripe(process.env.STRIPE_SECRET_ACCESS_KEY);
const { isProduction } = require('../../config/keys');
const router = express.Router();




router.post('/', async (req, res) => {
    let success_url = `${process.env.CLIENT_URL}/checkout`;
    let cancel_url = `${process.env.CLIENT_URL}/cart`;
    const website = "https://pixelpanda.onrender.com";
    if (isProduction) {
        success_url = `${website}/checkout`;
        cancel_url = `${website}/cart`;
    }

    // const total = req.body.cartItems.reduce((acc, item) => {
    //     return acc + (item.price * 100);
    // }, 0);

    // const paymentMethod = await stripe.paymentMethods.create({
    //     type: 'card', 
    //     card: {
    //         number: '4242424242424242',
    //         exp_month: 12,
    //         exp_year: 2024,
    //         cvc: '123',
    //     },
    // });


    // const paymentIntent = await stripe.paymentIntents.create({
    //     amount: Math.round(total, 2),
    //     currency: 'usd',
    //     payment_method: paymentMethod.id,
    //     confirm: true
    // });

    const session = await stripe.checkout.sessions.create({
        line_items: req.body.cartItems.map(cartItem => {
            return {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: cartItem.name,
                        images: [cartItem.ArtworkImageUrl],
                    },
                    unit_amount: parseFloat((cartItem.price * 100).toFixed(2)),
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
        success_url: success_url,
        cancel_url: cancel_url,
    });
    res.send(session);
});
module.exports = router;