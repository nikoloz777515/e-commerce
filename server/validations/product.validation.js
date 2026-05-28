// Modules
const { z } = require("zod");

// Schema to validate product requests body property
const validationProductSchema = z.object({
    title: z.string().min(5).max(50),
    description: z.string().min(10).max(500),
    price: z.number(),
    stock: z.number()
});

module.exports = { validationProductSchema };
