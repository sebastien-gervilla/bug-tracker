const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    name: {
        type: String,
        maxlength: 64,
        unique: true,
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
    membersId: {
        type: [String],
        required: true
    },
    ticketsId: {
        type: [String],
        required: false
    }
}, {
    timestamps: true
});

ProjectSchema.methods.addMember = (userId) => {
    this.members.push(userId);
};

ProjectSchema.methods.addTicket = (userId) => {
    this.tickets.push(userId);
};

const Project = mongoose.model("Project", ProjectSchema, "projects");
module.exports = Project;