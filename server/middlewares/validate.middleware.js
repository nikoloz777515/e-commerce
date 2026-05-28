// Utils
const AppError = require("../utils/AppError");

// Middleware function to validate body property in requests
const validate = (schema) => {
    return (req, res, next) => {
        const result = schema.safeParse(req.body);

        if (!result.success) {
            return next(new AppError("Validation failed!", 400));
        }

        req.body = result.data;

        next();
    }
}

module.exports = validate;