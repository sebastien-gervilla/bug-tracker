const jwt = require('jsonwebtoken');
const UserModel = require('../models/user-model');

const isAuth = async (req, res, next) => {
    const { token } = req.cookies;

    if (!token)
        return res.status(400).json({
            success: false,
            message: "Token doesn't exist."
        });
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await UserModel.findById(decoded.id);

    if (!user)
        return res.status(400).json({
            success: false,
            message: "User doesn't exist."
        });

    req.user = user;

    return res.status(200).json({
        success: true,
        message: "Successfully connected."
    });

    // return next();
};

module.exports = { isAuth };