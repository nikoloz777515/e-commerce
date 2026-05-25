const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "review giver is required"],
        ref: "User"
    },
    
    product: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Product is required"],
        ref: "Product"
    },

    rating: {
        type: Number,
        required: [true, "Product rating is required"],
        min: [1, "Rating must be at least 1"],
        max: [5, "Rating must be at most 5"]
    },

    comment: {
        type: String,
        required: [true, "Review comment is required"],
        maxlength: [200, "Comment cannot exceed 200 characters"]
    }
}, { timestamps: true });


reviewSchema.index({ user: 1, product: 1 }, { unique: true });

reviewSchema.index({rating: 1});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;