const mongoose = require('mongoose');
const CommentSchema = require('./comment-model');

const TicketSchema = new mongoose.Schema({
    name: {
        type: String,
        maxlength: 32,
        required: true,
        trim: true
    },
    desc: {
        type: String,
        maxlength: 128,
        required: true,
        trim: true
    },
    author: {
        type: String,
        maxlength: 65,
        required: true,
        trim: true
    },
    authorId: {
        type: String,
        maxlength: 64,
        required: true,
        trim: true
    },
    projectId: {
        type: String,
        maxlength: 64,
        required: true,
        trim: true
    },
    type: {
        type: String,
        required: true,
        trim: true
    },
    priority: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        required: true,
        trim: true
    },
    membersId: {
        type: [String],
        required: true
    },
    commentsId: {
        type: [String],
        required: false
    }
}, {
    timestamps: true
});

const Ticket = mongoose.model("Ticket", TicketSchema, "tickets");
module.exports = Ticket;