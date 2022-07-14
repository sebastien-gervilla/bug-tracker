const express = require('express');
const Router = express.Router();

const { check } = require('express-validator');
const { getUser, getUsers, fetchUsers, register, 
    login, logout, editUser, deleteUser } = require('../controllers/user-controllers');
const { isAuth } = require('../middlewares/auth');

// Routes

Router.get('/', getUser);

Router.get('/isauth', isAuth);

Router.get('/getusers', getUsers);

Router.post('/fetchusers', fetchUsers);

Router.post('/register', [
    check("name", "Name should be atleast 3 characters.").isLength({min: 3}),
    check("lname", "Last name should be atleast 2 characters.").isLength({min: 2}),
    check("email", "Invalid email.").isEmail(),
    check("password", "Password should be atleast 8 characters.").isLength({min: 8}),
], register);

Router.post('/login', login);

Router.post('/logout', logout);

Router.put('/', editUser);

Router.delete('/', deleteUser);

module.exports = Router;