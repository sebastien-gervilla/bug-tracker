const express = require('express');
const Router = express.Router();

const { check } = require('express-validator');
const { getTicketComments, createComment, editComment, deleteComment } = require('../controllers/comment-controllers');

Router.get('/ticket/:id', getTicketComments);

Router.post('/', [
    check("message", "Message should be atleast 5 characters.").isLength({min: 5})
], createComment)

Router.put('/:id', editComment);

Router.delete('/:id', deleteComment);

module.exports = Router;