const express = require('express');
const { protect } = require('../middlewares/protect.middleware');
const { createCheckoutSession, stripeWebhook } = require('../controllers/payment.controller');

const paymentRouter = express.Router();

// Create session
paymentRouter.post('/checkout', protect, createCheckoutSession);

// Route to handle webhook
paymentRouter.post('/webhook', stripeWebhook);

module.exports = paymentRouter;