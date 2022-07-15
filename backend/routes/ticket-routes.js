const express = require('express');
const Router = express.Router();

const { check } = require('express-validator');
const { getTickets, getProjectTickets, getTicket, getTicketMembers, addTicketMembers, removeTicketMember,
createTicket, editTicket, deleteTicket } = require('../controllers/ticket-controllers');

Router.get('/', getTickets);

Router.get('/:id', getTicket);

Router.get('/members/:id', getTicketMembers);

Router.get('/project/:id', getProjectTickets);

Router.post('/', [
    check("name", "Name should be atleast 2 characters.").isLength({min: 3}),
    check("desc", "Last name should be atleast 4 characters.").isLength({min: 4}),
], createTicket);

Router.put('/:id', editTicket);

Router.put('/addmembers/:id', addTicketMembers);

Router.put('/removemember/:id', removeTicketMember);

Router.delete('/:id', deleteTicket);

module.exports = Router;