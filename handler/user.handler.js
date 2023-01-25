const User = require("../model/user.model");
var crypto = require("crypto");

const jwt = require("jsonwebtoken");
const salt = crypto.randomBytes(16).toString("hex");
const get = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(404).json({ success: false, message: "User not found" });
  }
};
const login = async (req, res, next) => {
  let { email, password } = req.body;
  let existingUser;
  var hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, `sha512`)
    .toString(`hex`);

  existingUser = await User.findOne({ email: email });
  if (!existingUser || existingUser.password != hash) {
    const error = Error("Wrong details please check at once");
    res.json({ message: "Wrong details please check at once" });
  }
  let token;
  try {
    //Creating jwt token
    token = jwt.sign(
      { userId: existingUser.id, email: existingUser.email },
      process.env.TOKEN_SECRET,
      { expiresIn: "1h" }
    );
  } catch (err) {
    console.log(err);
    const error = new Error("Error! Something went wrong.");
    res.send(error);
  }

  res.status(200).json({
    success: true,
    data: {
      userId: existingUser.id,
      email: existingUser.email,
      token: token,
    },
  });
};

const post = async (req, res, next) => {
  const password = crypto
    .pbkdf2Sync(req.body.password, salt, 1000, 16, `sha512`)
    .toString(`hex`);
  const { name, email, phone } = req.body;
  const user = new User({
    name,
    email,
    phone,
    password,
  });

  const savedUser = await user.save();
  let token;
  token = jwt.sign(
    { userId: savedUser.id, email: savedUser.email },
    process.env.TOKEN_SECRET,
    { expiresIn: "1h" }
  );
  res.status(201).json({
    success: true,
    data: savedUser,
    token: token,
  });
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
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      res.status(404).json({ messgae: "User Not Found!" });
    }

    console.log(user);

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
  login,
};
