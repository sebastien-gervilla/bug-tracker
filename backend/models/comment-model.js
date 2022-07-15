const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    author: {
        type: String,
        maxlength: 65,
        required: true,
        trim: true
    },
    authorId: {
        type: String,
        required: true
    },
    ticketId: {
        type: String,
        maxlength: 64,
        required: true,
        trim: true
    },
    message: {
        type: String,
        maxlength: 128,
        required: true,
        trim: true
    }
}, {
    timestamps: true
});

const Comment = mongoose.model("Comment", CommentSchema, "comments");
module.exports = Comment;