// Models
const Payment = require('../models/payment.model');
const Product = require('../models/product.model');

// Utils
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

// Stripe import
const stripe = require('stripe')(process.env.SECRET_STRIPE_KEY);

// Create session
const createCheckoutSession = catchAsync(async (req, res, next) => {
    const { productsIds } = req.body;

    const products = await Product.find({_id: {$in: productsIds} });

    if(products.length == 0) {
        return next(new AppError("Products cant be found", 404));
    }

    const line_items = products.map(product => {
        return {
            price_data: {
                currency: "usd",
                product_data: {
                    name: product.universal.title,
                    description: product.universal.description
                },

                unit_amount: product.universal.price * 100,
            },
            quantity: 1
        }
    });

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        line_items,
        success_url: "http://localhost:3000/success",
        cancel_url: "http://localhost:3000/cancel"
    });

    const payment = await Payment.create({
        userId: req.user._id,
        stripeSessionId: session.id,
        stripePaymentIntentId: session.payment_intent,
        totalAmount: products.reduce((accumulator, item) => {
            return accumulator + item.universal.price;
        }, 0),
        status: "pending"
    });

    res.status(201).json({
        status: "success",
        message: "Session created!",
        data: {
            payment,
            sessionUrl: session.url,
            sessionId: session.id
        }
    });
});

// Controller to handle Webhook
const stripeWebhook = async (req, res, next) => {
    const signature = req.headers["stripe-signature"];

    let event;

    try {
        event = stripe.webhooks.constructEvent( req.body, signature, process.env.STRIPE_WEBHOOK_SECRET );
    } catch (err) {
        return next(new AppError(`Webhook error: ${err.message}`, 400));
    }

    if (event.type === "checkout.session.completed") {
        const session = event.data.object;

        const payment = await Payment.findOne({ stripeSessionId: session.id });

        if (!payment) {
            return next(new AppError("Payment not found!", 404));
        }

        payment.status = "succeeded";
        payment.stripePaymentIntentId = session.payment_intent;
        payment.webhookProcessed = true;

        await payment.save();
    }

    if (event.type === "payment_intent.payment_failed") {
        const paymentIntent = event.data.object;

        const payment = await Payment.findOne({ stripePaymentIntentId: paymentIntent.id });
        
        if (!payment) {
            return next(new AppError("Payment not found!", 404));
        }

        payment.status = "failed";
        payment.webhookProcessed = true;

        await payment.save();
    }

    res.status(200).json({ received: true });
};

module.exports = { createCheckoutSession, stripeWebhook };