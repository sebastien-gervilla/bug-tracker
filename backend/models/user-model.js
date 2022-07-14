const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        maxlength: 32,
        required: true,
        trim: true
    },
    lname: {
        type: String,
        maxlength: 32,
        required: true,
        trim: true
    },
    role: {
        type: String,
        default: "developper",
        enum: ["developper", "manager", "admin"],
        required: true,
        trim: true
    },
    email: {
        type: String,
        maxlength: 320,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        time: true,
        select: false
    },
    salt: String
}, {
    timestamps: true
});

UserSchema.pre('save', async function(next) {
    if (!this.isModified("password")) {
        next();
    };
    
    this.password = await bcrypt.hash(this.password, 10);
});

UserSchema.methods.verifyPassword = async function(plainPassword) {
    return bcrypt.compare(plainPassword, this.password);
};

UserSchema.methods.generateJwt = function() {
    return jwt.sign({id: this.id}, process.env.JWT_SECRET)
};

const User = mongoose.model("User", UserSchema, "users", {expiresIn: 3600});
module.exports = User;