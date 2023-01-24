const User = require("../model/user.model");

const get = (req, res) => {
    res.end("Hello");
};

const post = async (req, res) => {
    const user = new User(req.body);

    const savedUser = await user.save();

    res.json(savedUser);
};

module.exports = {
    get,
    post,
};
