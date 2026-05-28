// Modules
const { z } = require("zod");

// Schema to validate create category request body property
const createCategorySchema = z.object({
    name: z.string().max(30),
    description: z.string().max(500),
    parentCategory: z.string(),
    allowedAttributes: z.array(z.string())
}).strict();

// Schema to validate edit category request body property
const editCategorySchema = z.object({
    name: z.string().max(30),
    description: z.string().max(500),
    parentCategory: z.string(),
    allowedAttributes: z.array(z.string()),
    isActive: z.boolean()
}).strict();

module.exports = { createCategorySchema, editCategorySchema };