const mongoose = require("mongoose");

const schema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        default: null,
    },
});

const User = mongoose.model("User", schema);

module.exports = User;
