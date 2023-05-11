const express = require("express");
const router = express.Router();
const stripe = require('stripe')('sk_test_51N5BPXL7XepAWAoVi9v6kO3luFTOh8mMGKU3dBldV7W0CeiffvNDPEEtnDZFQkRnyq4rOYZnNSClwNX3HN2jClSs00p5m9DtjX');

router.post('/intent', async (req, res) => {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: 'usd',
        automatic_payment_methods: {
          enabled: true,
        },
      });
  
      res.json({ paymentIntent: paymentIntent.client_secret });
    } catch (e) {
      res.status(400).json({
        error: e.message,
      });
    }
  });
  
module.exports = router;