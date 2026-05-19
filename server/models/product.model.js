// Modules
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    universal: {
        title: {
            type: String,
            required: [true, "Title is required"]
        },
        description: {
            type: String,
            required: [true, "Description is required"]
        },
        price: {
            type: Number,
            required: [true, "Price is required"]
        },
        stock: {
            type: Number,
            default: 1
        },
        images: [
            {
                src: {
                    type: String,
                    required: [true, "Image is required!"]
                },

                alt: {
                    type: String,
                    required: [true, "Alt is required!"]
                }
            }
        ],
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: [true, "Caterogy is required!"]
        },
        sellerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "Seller ID is required!"]
        }
    },
    attributes: {
        type: mongoose.Schema.Types.Mixed
    }
}, {
    timestamps: true
});

productSchema.index({
    "universal.category": 1
});

productSchema.index({
    "universal.sellerId": 1
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
