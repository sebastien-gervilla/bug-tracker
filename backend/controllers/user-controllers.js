const User = require('../models/user-model');
const { validationResult } = require('express-validator');
const ObjectID = require('mongoose').Types.ObjectId;
const jwt = require('jsonwebtoken');

const getUser = async (req, res) => {
    const { token } = req.cookies;
    if (!token)
        return res.status(400).json({
            success: false,
            message: "Token doesn't exist."
        });

    const userId = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(userId.id);
    if (!user)
        return res.status(400).json({
            success: false,
            message: "Could not find user."
        })

    return res.status(200).json({
        success: true,
        message: "Successfully fetched user.",
        user
    });
};

const getUsers = async(req, res) => {
    const users = await User.find();

    return res.status(200).json({
        success: true,
        message: "Successfully fetched users.",
        users
    });
};

const fetchUsers = async (req, res) => {
    const { membersId } = req.body;
    if (!membersId)
        return res.status(400).json({
            success: false,
            message: "No id given."
        });

    const users = await User.find({_id: {
        $in: membersId
    }});

    if (!users)
        res.status(400).json({
            success: false,
            message: "Couldn't find any user matching the ids."
        });

    return res.status(200).json({
        success: true,
        message: "Successfully fetched users.",
        users
    });
};

const register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).json({
            success: false,
            message: errors.array()[0].msg
        });

    const { email } = req.body;
    if (await User.findOne({email: email}))
        return res.status(400).json({
            success: false,
            message: "Email already exists"
        });

    const NewUser = new User(req.body);
    NewUser.save((error, user) => {
        if (error)
            return res.status(400).json({
                success: false,
                message: "Unable to add user : " + error
            });

        return res.json({
            success: true,
            message: "Successfully registered user.",
            user
        });
    });
};

const login = async (req, res) => {
    const { email, password } = req.body;
    if(!email || !password)
        return res.status(400).json({
            succes: false,
            message: "Email and password are required."
        });

    const user = await User.findOne({ email: email }).select('+password');
    if (!user)
        return res.status(400).json({
            success: false,
            message: "User not found."
        });

    const hasMatched = await user.verifyPassword(password);
    if (!hasMatched)
        return res.status(400).json({
            success: false,
            message: "Email and password do not match."
        });

    await generateToken(user, res);
};

const logout = (req, res) => {
    res.clearCookie('token');
    res.status(200).json({
        success: true,
        message: "Successfully logged out."
    });
}

const editUser = async (req, res) => {
    const id = req.params.id;
    if (!ObjectID.isValid(id))
        return res.status(400).json({
            success: false,
            message: "Unknown ID : " + id
        });

    const oldUser = await User.findById(id);
    if (!oldUser)
        return res.status(400).json({
            success: false,
            message: "Coudln't find user with ID : " + id
        });

    const updateSet = {
        name: req.body.name,
        lname: req.body.lname,
        role: req.body.role,
        email: req.body.email
    };

    try {
        const user = await User.findByIdAndUpdate(
            id,
            { $set: updateSet },
            { new: true, runValidators: true });
        if (!user)
            return res.status(400).json({
                success: false,
                message: "Couldn't find user with ID : " + id
            });
    
        return res.status(200).json({
            success: true,
            message: "Successfully edited user.",
            user
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success: false,
            message: "Couldn't edit user."
        });
    }
};

const deleteUser = async (req, res) => {
    const id = req.params.id;
    if (!id)
        return res.status(400).json({
            success: false,
            message: "User ID is required."
        });

    try {
        const user = await User.findByIdAndDelete(id);
        return res.status(200).json({
            success: true,
            message: "Successfully deleted user."
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success: false,
            message: "Couldn't delete user."
        });
    }
};

const generateToken = async (user, res) => {
    const token = await user.generateJwt();
    const options = {
        httpOnly: true
    };

    res.status(200)
    .cookie('token', token, options)
    .json({
        success: true,
        message: "Successfully created token.",
        token
    });
};

module.exports = { getUser, getUsers, fetchUsers, register, login, logout, editUser, deleteUser };