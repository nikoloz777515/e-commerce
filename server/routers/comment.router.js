const express = require("express");
const { getComments, getCommentById, createComment, deleteCommentById, updateCommentById } = require("../controllers/comment.controller");
const { protect } = require("../middlewares/protect.middleware");

const commentRouter = express.Router();

commentRouter.get("/", getComments);

commentRouter.get("/:commentId", getCommentById);

commentRouter.post("/:productId", protect, createComment);

commentRouter.delete("/:commentId", protect, deleteCommentById);

commentRouter.patch("/:commentId", protect, updateCommentById);

module.exports = commentRouter;