const express = require('express');
const { protect } = require('../middlewares/protect.middleware');
const { createCheckoutSession, stripeWebhook } = require('../controllers/payment.controller');
const { paymentLimiter } = require('../config/rateLimit.config');

const paymentRouter = express.Router();

// Create session — paymentLimiter prevents carding attacks and Stripe quota abuse.
// The /webhook route is intentionally excluded; it comes from Stripe, not users.
paymentRouter.post('/checkout', protect, paymentLimiter, createCheckoutSession);

// Route to handle webhook
paymentRouter.post('/webhook', stripeWebhook);

module.exports = paymentRouter;