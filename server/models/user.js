const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    firstName: {
        type: String,
        // required: true
    },
    lastName: {
        type: String
    }
});

const User = mongoose.model("User", userSchema); // Correct order of arguments

module.exports = {
    User
};
