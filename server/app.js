// 3rd Modules
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const Sentry = require("@sentry/node");
const cookieParser = require('cookie-parser');
const path = require("path");
const morgan = require('morgan');

// Security modules
const { sanitize: mongoSanitize } = require('express-mongo-sanitize');

// Our modules

// Configs
const connectDB = require('./config/db.config');

// Controllers
const globalErrorHandler = require('./controllers/error.controller');

// Routers
const authRouter = require('./routers/auth.router');
const categoryRouter = require('./routers/category.router');
const productRouter = require('./routers/product.router');
const paymentRouter = require('./routers/payment.router');
const userRouter = require('./routers/user.router');
const limiter = require('./config/rateLimit.config');

// ----------------------------------------------------------------------------------------

// Env init
dotenv.config();

// Sentry init
Sentry.init({
    dsn: process.env.SENTRY_URL,
    // Setting this option to true will send default PII data to Sentry.
    // For example, automatic IP address collection on events
    sendDefaultPii: true,
});

// Server init
const app = express();
app.use(morgan('dev'))

// Security headers
app.use(limiter);

app.use('/api/payment/webhook', express.raw({ type: "application/json" }));

// Middlewares
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// express-mongo-sanitize v2 assigns req.query which is read-only in Express v5;
// _sanitize mutates in-place so skipping the reassignment for query is safe.
app.use((req, res, next) => {
    const opts = { replaceWith: '_' };
    if (req.body) req.body = mongoSanitize(req.body, opts);
    if (req.params) req.params = mongoSanitize(req.params, opts);
    if (req.query) mongoSanitize(req.query, opts);
    next();
});

app.use(express.static(path.join(__dirname, "./images")));

// Error handler
Sentry.setupExpressErrorHandler(app);

// Health check
app.get('/health', (req, res) => {
    res.json({
        status: "success",
        message: "Server is running!"
    });
});

// Routers
app.use('/api/auth', authRouter);
app.use('/api/category', categoryRouter);
app.use('/api/product', productRouter);
app.use('/api/payment', paymentRouter);
app.use("/api/user", userRouter);

// Error handler
app.use(globalErrorHandler);

// Connect DB
connectDB();

// Listening for requests
app.listen(process.env.PORT, () => {
    console.log("Server is listening for requests!");
});
