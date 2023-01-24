const User = require("../model/user.model");

const get = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json({ success: true, data: user });
    } catch (error) {
        res.status(404).json({ success: false, message: "User not found" });
    }
};

const post = async (req, res) => {
    const user = new User(req.body);

    const savedUser = await user.save();

    res.json(savedUser);
};
const update = async (req, res) => {
    try {
        console.log(req.data);
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json({ success: true, data: user });
    } catch (error) {
        if (error.name === "CastError") {
            res.status(400).json({
                success: false,
                message: "Invalid user id",
            });
        } else {
            res.status(404).json({ success: false, message: "User not found" });
        }
    }
};
const remove = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, message: "User Removed!" });
    } catch (error) {
        if (error.name === "CastError") {
            res.status(400).json({
                success: false,
                message: "Invalid user id",
            });
        } else {
            res.status(404).json({ success: false, message: "User not found" });
        }
    }
};
const all = async (req, res) => {
    try {
        const users = await User.find().select("name");
        res.status(200).json({ success: true, data: users });
    } catch (error) {
        res.status(500).json({ success: false, message: error });
    }
};
module.exports = {
    get,
    post,
    update,
    remove,
    all,
};
