// Security modules
const mongoSanitize = require("express-mongo-sanitize");

// Middleware function to sanitize user input and prevent NoSQL injection attacks
const mongoSanitizeMiddleware = (req, res, next) => {
    const options = { replaceWith: '_' };

    if (req.body) mongoSanitize.sanitize(req.body, options);

    if (req.params) mongoSanitize.sanitize(req.params, options);

    if (req.query) mongoSanitize.sanitize(req.query, options);

    next();
}

module.exports = mongoSanitizeMiddleware;