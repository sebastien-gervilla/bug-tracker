const Ticket = require('../models/ticket-model');
const Comment = require('../models/comment-model');

const deleteProjectTickets = async (projectId) => {
    if (!projectId)
        return;

    const tickets = await Ticket.find({projectId: projectId});
    if (!tickets.length)
        return;

    for (const ticket of tickets) {
        await deleteTicketComments(ticket._id)

        try {
            await Ticket.findByIdAndDelete({_id: ticket._id});
        } catch (error) {
            console.log(error);
        }
    }
}

const deleteTicketComments = async (ticketId) => {
    if (!ticketId)
        return;

    const comments = await Comment.find({ticketId: ticketId});
    if (!comments.length)
        return;

    for (const comment of comments) {
        try {
            await Comment.findByIdAndDelete({_id: comment._id});
        } catch (error) {
            console.log(error);
        };
    }
};

module.exports = { deleteProjectTickets, deleteTicketComments };