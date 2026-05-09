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
    const { userOrder } = req.body;

    const productsIds = userOrder.map(p => p.id);

    const obj = userOrder.reduce((acc, cur) => {
        if (!Number.isInteger(cur.quantity) || cur.quantity <= 0) {
            return next(new AppError("Incorrect quantity!", 400));
        }

        acc[cur.id] = cur.quantity;

        return acc;
    }, {});

    const products = await Product.find({ _id: { $in: productsIds } });

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
            quantity: obj[product._id.toString()]
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
            return accumulator + item.universal.price * obj[item._id.toString()];
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

        if (session.payment_status !== "paid") return res.status(200).json({ received: true });

        const payment = await Payment.findOne({ stripeSessionId: session.id });

        if (!payment) {
            return res.status(200).json({ received: true });
        }

        payment.status = "succeeded";
        payment.stripePaymentIntentId = session.payment_intent;
        payment.webhookProcessed = true;

        await payment.save();
    }

    if (event.type === "payment_intent.payment_failed") {
        const paymentIntent = event.data.object;

        const sessionId = paymentIntent.payment_details?.order_reference;
        const payment = await Payment.findOne({ stripeSessionId: sessionId });

        if (!payment) {
            return res.status(200).json({ received: true });
        }

        payment.status = "failed";
        payment.stripePaymentIntentId = paymentIntent.id;
        payment.webhookProcessed = true;

        await payment.save();
    }

    res.status(200).json({ received: true });
};

module.exports = { createCheckoutSession, stripeWebhook };