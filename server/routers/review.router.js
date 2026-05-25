const express = require("express");
const { getReviews, getReviewById, createReview, deleteReviewById, updateReviewById } = require("../controllers/review.controller");
const { protect } = require("../middlewares/protect.middleware");

const reviewRouter = express.Router();

reviewRouter.get("/", getReviews);

reviewRouter.get("/:productId", getReviewById);

reviewRouter.post("/:productId", protect, createReview);

reviewRouter.delete("/:reviewId", protect, deleteReviewById);

reviewRouter.patch("/:reviewId", protect, updateReviewById);

module.exports = reviewRouter;