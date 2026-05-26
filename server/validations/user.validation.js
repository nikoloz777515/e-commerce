// Modules
const { z } = require("zod");

// Schema to validate update user request body property
const updateUserSchema = z.object({
    fullname: z.string().min(3).max(30),
    password: z.string().min(8).max(50),
}).strict();

// Schema to validate update user role requests body property
const updateUserRoleSchema = z.object({
    role: z.string()
}).strict();

module.exports = { updateUserSchema, updateUserRoleSchema };