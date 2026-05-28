const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Comment giver is required"],
        ref: "User"
    },


    product: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Product is required"],
        ref: "Product"
    },

    content: {
        type: String,
        required: [true, "Comment content is required"],
        minlength: [1, "Comment cannot be empty"],
        maxlength: [200, "Comment cannot exceed 200 characters"]
    }


})

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;