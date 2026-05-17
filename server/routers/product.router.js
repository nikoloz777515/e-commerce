const express = require('express');
const { protect, allowedTo } = require('../middlewares/protect.middleware');
const { getProducts, createProduct, editProduct, deleteProduct } = require('../controllers/product.controller');
const upload = require('../config/upload.config');

const productRouter = express.Router();

// Get products
productRouter.get('/', getProducts);

// Create product
productRouter.post('/:categoryId', protect, allowedTo("admin", "seller"), upload.array("images", 5), createProduct);

// Delete product by id
productRouter.delete('/:productId',  protect, allowedTo("admin", "seller"), deleteProduct);

// Edit product
productRouter.patch('/:productId', protect, upload.array("images", 5), editProduct);

module.exports = productRouter;

