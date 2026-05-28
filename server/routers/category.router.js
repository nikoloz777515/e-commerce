// Modules
const express = require('express');

// Middlewares
const { protect, allowedTo } = require('../middlewares/protect.middleware');
const validate = require('../middlewares/validate.middleware');

// Controllers
const { getCategories, createCategory, deleteCategory, editCategory } = require('../controllers/category.controller');

// Configs
const upload = require('../config/upload.config');
const { uploadLimiter } = require('../config/rateLimit.config');

// Validation
const { createCategorySchema, editCategorySchema } = require('../validations/category..validation');

const categoryRouter = express.Router();

// Get all categories
categoryRouter.get('/', getCategories);

// Create new category
categoryRouter.post('/', protect, allowedTo('admin'), uploadLimiter, upload.single("image"), validate(createCategorySchema), createCategory);

// Delete category
categoryRouter.delete('/:id', protect, allowedTo('admin'), deleteCategory);

// Edit category
categoryRouter.patch('/:id', protect, allowedTo('admin'), uploadLimiter, upload.single("image"), validate(editCategorySchema), editCategory);

module.exports = categoryRouter ;