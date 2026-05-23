const express = require('express');
const { protect, allowedTo } = require('../middlewares/protect.middleware');
const { getCategories, createCategory, deleteCategory, editCategory } = require('../controllers/category.controller');
const upload = require('../config/upload.config');
const { uploadLimiter } = require('../config/rateLimit.config');

const categoryRouter = express.Router();

// Get all categories
categoryRouter.get('/', getCategories);

// Create new category
categoryRouter.post('/', protect, allowedTo('admin'), uploadLimiter, upload.single("image"), createCategory);

// Delete category
categoryRouter.delete('/:id', protect, allowedTo('admin'), deleteCategory);

// Edit category
categoryRouter.patch('/:id', protect, allowedTo('admin'), uploadLimiter, upload.single("image"), editCategory);

module.exports = categoryRouter ;