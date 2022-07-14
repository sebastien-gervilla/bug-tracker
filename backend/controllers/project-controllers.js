const Project = require('../models/project-model');
const User = require('../models/user-model');
const { validationResult } = require('express-validator');
const ObjectID = require('mongoose').Types.ObjectId;
const jwt = require('jsonwebtoken');
const { deleteProjectTickets } = require('../utils/delete-child');

const getProjects = async (req, res) => {
    const projects = await Project.find();

    return res.status(200).json({
        success: true,
        message: "Successful request.",
        projects
    });
};

const getProject = async (req, res) => {
    const id = req.params.id;
    if (!ObjectID.isValid(id))
        return res.status(400).json({
            success: false,
            message: "Unknown ID : " + id
        });

    const project = await Project.findById(id);
    if (!project)
        return res.status(400).json({
            success: false,
            message: "Couldn't find project with ID : " + id
        });

    return res.status(200).json({
        success: true,
        message: "Successfully fetched project.",
        project
    });

};

const getProjetMembers = async (req, res) => {
    const membersId = req.body.membersId;
    const users = await User.find({memberId: membersId});
    
    return res.status(400).json({
        success: false,
        message: "Successfully fetched projet members",
        users
    });
};

const createProject = async (req, res) => {
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

    const { name } = req.body;
    if (await Project.findOne({name: name}))
        return res.status(400).json({
            success: false,
            message: "Project already exist."
        });

    const NewProject = new Project(req.body);
    NewProject.save((error, project) => {
        if (error)
            return res.status(400).json({
                success: false,
                message: "Unable to create project."
            });

        return res.status(200).json({
            success: true,
            message: "Successfully created project.",
            project
        });
    });
};

const editProject = async (req, res) => {
    const id = req.params.id;
    if (!ObjectID.isValid(id))
        return res.status(400).json({
            success: false,
            message: "Unknown ID : " + id
        });

    const oldProject = await Project.findById(id);
    if (!oldProject)
        return res.status(400).json({
            success: false,
            message: "Coudln't find project with ID : " + id
        });

    let newMembersId = []
    req.body.membersId.forEach(memberId => {
        if (!oldProject.membersId.includes(memberId))
            newMembersId.push(memberId)
    });

    const updateSet = {
        name: req.body.name,
        desc: req.body.desc
    };

    const updatePush = {
        membersId: newMembersId
    };

    try {
        const project = await Project.findByIdAndUpdate(
            id,
            { $set: updateSet, $push: updatePush },
            { new: true, runValidators: true });
        if (!project)
            return res.status(400).json({
                success: false,
                message: "Couldn't find project with ID : " + id
            });
    
        return res.status(200).json({
            success: true,
            message: "Successfully edited project.",
            project
        });
    } catch (error) {
        console.log(error);
    }
};

const deleteProject = async (req, res) => {
    const id = req.params.id;
    if (!id)
        return res.status(400).json({
            success: false,
            message: "Project ID is required."
        });

    try {
        const project = await Project.findByIdAndDelete(id);
        await deleteProjectTickets(project._id);
        return res.status(200).json({
            success: true,
            message: "Successfully deleted project."
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "Couldn't delete project."
        });
    }
};

module.exports = { getProjects, getProject, getProjetMembers, createProject, editProject, deleteProject };