const express = require('express');
const { protect, allowedTo } = require('../middlewares/protect.middleware');
const { getCategories, createCategory, deleteCategory, editCategory } = require('../controllers/category.controller');
const upload = require('../config/upload.config');

const categoryRouter = express.Router();

// Get all categories
categoryRouter.get('/', getCategories);

// Create new category
categoryRouter.post('/', protect, allowedTo('admin'), upload.single("image"), createCategory);

// Delete category
categoryRouter.delete('/:id', protect, allowedTo('admin'), deleteCategory);

// Edit category
categoryRouter.patch('/:id', protect, allowedTo('admin'), upload.single("image"), editCategory);

module.exports = categoryRouter ;