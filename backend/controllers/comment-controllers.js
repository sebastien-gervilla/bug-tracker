const Comment = require('../models/comment-model');
const Ticket = require('../models/ticket-model');
const User = require('../models/user-model');
const { validationResult } = require('express-validator');
const ObjectID = require('mongoose').Types.ObjectId;
const jwt = require('jsonwebtoken');

const getTicketComments = async (req, res) => {
    const id = req.params.id;
    if (!ObjectID.isValid(id))
        return res.status(400).json({
            success: false,
            message: "Unknown ID : " + id
        });

    const comments = await Comment.find({ticketId: id});
    return res.status(200).json({
        success: true,
        message: "Successfully fetched comments.",
        comments
    });
};

const createComment = async (req, res) => {
    const { token } = req.cookies;
    if (!token)
        return res.status(400).json({
            success: false,
            message: "Token doesn't exist."
        });
    
    const currUserId = jwt.verify(token, process.env.JWT_SECRET);
    const author = await User.findById(currUserId.id);
    if (!author)
        return res.status(400).json({
            success: false,
            message: "Could not find author."
        });

    req.body.authorId = author._id;
    req.body.author = author.name + " " + author.lname;

    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).json({
            success: false,
            message: errors.array()[0].msg
        });

    const NewComment = new Comment(req.body);
    NewComment.save((error, comment) => {
        if (error)
            return res.status(400).json({
                success: false,
                message: "Unable to create comment."
            });

        return res.status(200).json({
            success: true,
            message: "Successfully created comment.",
            comment
        });
    });
};

const editComment = async (req, res) => {
    const id = req.params.id;
    if (!ObjectID.isValid(id))
        return res.status(400).json({
            success: false,
            message: "Unknown ID : " + id
        });

    const updateSet = {
        message: req.message
    };

    try {
        const comment = await Comment.findByIdAndUpdate(
            id,
            {$set: updateSet},
            {runValidators: true, new: true});

        return res.status(200).json({
            success: true,
            message: "Successfully edited comment.",
            comment
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "Couldn't edit comment."
        })
    }
};

const deleteComment = async (req, res) => {
    const id = req.params.id;
    if (!ObjectID.isValid(id))
        return res.status(400).json({
            success: false,
            message: "Unknown ID : " + id
        });

    Comment.findByIdAndDelete(
        id,
        (error, comment) => {
            if (!comment)
                return res.status(400).json({
                    success: false,
                    message: "Comment not found."
                });

            if (error)
                return res.status(400).json({
                    success: false,
                    message: "Couldn't delete comment."
                });

            return res.status(200).json({
                success: true,
                message: "Successfully deleted comment."
            });
        }
    );
};

module.exports = { getTicketComments, createComment, editComment, deleteComment };