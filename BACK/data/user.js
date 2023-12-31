const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        trim: true,
        required: true
    },

    username: {
        type: String,
        trim: true,
        required: true
    },

    password: {
        type: String,
        trim: true,
        required: true
    },

    interests: {
        type: [String],
        required: true
    }
})

module.exports = mongoose.model("User", userSchema);