const Project = require('../models/project-model');
const Ticket = require('../models/ticket-model');
const User = require('../models/user-model');
const { validationResult } = require('express-validator');
const ObjectID = require('mongoose').Types.ObjectId;
const jwt = require('jsonwebtoken');
const { deleteTicketComments } = require('../utils/delete-child');

const getTickets = async (req, res) => {
    const tickets = await Ticket.find();

    return res.status(200).json({
        success: true,
        message: "Successfully fetched tickets.",
        tickets
    });
};

const getProjectTickets = async (req, res) => {
    const id = req.params.id;
    if (!ObjectID.isValid(id))
        return res.status(400).json({
            success: false,
            message: "Unknown ID : " + id
        });

    const tickets = await Ticket.find({projectId: id});
    return res.status(200).json({
        success: true,
        message: "Successfully fetched tickets.",
        tickets
    });
};

const getTicketMembers = async (req, res) => {
    const id = req.params.id;
    if (!ObjectID.isValid(id))
        return res.status(400).json({
            success: false,
            message: "Unknown ID : " + id
        });

    const ticket = await Ticket.findById(id);
    if (!ticket)
        return res.status(400).json({
            success: false,
            message: "Couldn't find ticket with ID : " + id
        });
    
    const members = await User.find({
        _id: { $in: ticket.membersId }
    });
    
    return res.status(200).json({
        success: true,
        message: "Successfully fetched ticket members.",
        members
    });
};

const removeTicketMember = async (req, res) => {
    const id = req.params.id;
    if (!ObjectID.isValid(id))
        return res.status(400).json({
            success: false,
            message: "Unknown ID : " + id
        });

    const oldTicket = await Ticket.findById(id);
    if (!oldTicket)
        return res.status(400).json({
            success: false,
            message: "Coudln't find ticket with ID : " + id
        });

    const memberId = req.body.memberId;
    if (!ObjectID.isValid(memberId))
        return res.status(400).json({
            success: false,
            message: "Unknown ID : " + id
        });

    if(!oldTicket.membersId.includes(memberId))
        return res.status(400).json({
            success: false,
            message: "User not found in ticket with id : " + id
        });

    const updatePull = {
        membersId: memberId
    };

    try {
        const ticket = await Ticket.findByIdAndUpdate(
            id,
            {$pull: updatePull},
            {runValidators: true, new: true});

        return res.status(200).json({
            success: true,
            message: "Successfully edited ticket.",
            ticket
        });
    } catch (error) {
        console.log(error);
    }
};

const addTicketMembers = async (req, res) => {
    const id = req.params.id;
    if (!ObjectID.isValid(id))
        return res.status(400).json({
            success: false,
            message: "Unknown ID : " + id
        });

    const oldTicket = await Ticket.findById(id);
    if (!oldTicket)
        return res.status(400).json({
            success: false,
            message: "Coudln't find ticket with ID : " + id
        });

    const membersId = req.body.membersId;
    if (!membersId)
        return res.status(400).json({
            success: false,
            message: "Couldn't find any user."
        });

    let newMembersId = []
    membersId.forEach(memberId => {
        if (!oldTicket.membersId.includes(memberId))
            newMembersId.push(memberId)
    });

    const updatePush = {
        membersId: newMembersId
    };

    try {
        const ticket = await Ticket.findByIdAndUpdate(
            id,
            {$push: updatePush},
            {runValidators: true, new: true});

        return res.status(200).json({
            success: true,
            message: "Successfully edited ticket.",
            ticket
        });
    } catch (error) {
        console.log(error);
    }
}

const getTicket = async (req, res) => {
    const id = req.params.id;
    if (!ObjectID.isValid(id))
        return res.status(400).json({
            success: false,
            message: "Unknown ID : " + id
        });

    const ticket = await Ticket.findById(id);
    if (!ticket)
        return res.status(400).json({
            success: false,
            message: "Couldn't find ticket with ID : " + id
        });

    return res.status(200).json({
        success: true,
        message: "Successfully fetched ticket.",
        ticket
    });
};

const createTicket = async (req, res) => {
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

    const NewTicket = new Ticket(req.body);
    NewTicket.save((error, ticket) => {
        if (error)
            return res.status(400).json({
                success: false,
                message: "Unable to create ticket."
            });

        return res.status(200).json({
            success: true,
            message: "Successfully created ticket.",
            ticket
        });
    });
};

const editTicket = async (req, res) => {
    const id = req.params.id;
    if (!ObjectID.isValid(id))
        return res.status(400).json({
            success: false,
            message: "Unknown ID : " + id
        });

    const oldTicket = await Ticket.findById(id);
    if (!oldTicket)
        return res.status(400).json({
            success: false,
            message: "Coudln't find ticket with ID : " + id
        });

    let newMembersId = []
    req.body.membersId.forEach(memberId => {
        if (!oldTicket.membersId.includes(memberId))
            newMembersId.push(memberId)
    });

    const updateSet = {
        name: req.body.name,
        desc: req.body.desc,
        type: req.body.type,
        priority: req.body.priority,
        status: req.body.status
    };

    const updatePush = {
        membersId: newMembersId
    };

    try {
        const ticket = await Ticket.findByIdAndUpdate(
            id,
            {$set: updateSet, $push: updatePush},
            {runValidators: true, new: true});

        return res.status(200).json({
            success: true,
            message: "Successfully edited ticket.",
            ticket
        });
    } catch (error) {
        console.log(error);
    }
};

const deleteTicket = async (req, res) => {
    const id = req.params.id;
    if (!ObjectID.isValid(id))
        return res.status(400).json({
            success: false,
            message: "Unknown ID : " + id
        });

    try {
        const ticket = await Ticket.findByIdAndDelete(id);
        await deleteTicketComments(ticket._id);
        return res.status(200).json({
            success: true,
            message: "Successfully deleted ticket."
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "Couldn't delete ticket."
        });
    }
};

module.exports = { getTickets, getProjectTickets, getTicket, getTicketMembers, 
    addTicketMembers, removeTicketMember, createTicket, editTicket, deleteTicket };