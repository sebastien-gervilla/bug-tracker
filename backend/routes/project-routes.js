const express = require('express');
const Router = express.Router();

const { check } = require('express-validator');
const { getProjects, getProject, getProjetMembers, 
    createProject, editProject, deleteProject } = require('../controllers/project-controllers');

Router.get('/', getProjects);

Router.get('/members', getProjetMembers);

Router.get('/:id', getProject);

Router.post('/', [
    check("name", "Name should be atleast 2 characters.").isLength({min: 3}),
    check("desc", "Last name should be atleast 8 characters.").isLength({min: 8}),
], createProject);

Router.put('/:id', editProject);

Router.delete('/:id', deleteProject);

module.exports = Router;