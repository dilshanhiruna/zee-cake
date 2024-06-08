const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

exports.createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if the user already exists
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ error: "User already exists" });
    }

    // hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      name,
      email,
      role,
      password: hashedPassword,
    });

    const savedPost = await user.save();

    res.status(201).json({
      message: "successful",
      user: savedPost,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to create user" });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ error: "Invalid email or email not found" });
    }

    // Check if the password is correct
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ error: "Invalid password" });
    }

    // send a jwt token
    const token = jwt.sign(
      {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      "secret_zee_cake"
    );

    if (!token) {
      return res.status(500).json({ error: "Failed to create token" });
    }

    res.json({
      message: "successful",
      token,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to login" });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user" });
  }
};

exports.updateUser = async (req, res) => {
  try {
    // only update the fields that are passed in the request body and if those are not empty strings

    const updatedFields = {};
    if (req.body.name && req.body.name !== "") {
      updatedFields.name = req.body.name;
    }
    if (req.body.email && req.body.email !== "") {
      updatedFields.email = req.body.email;
    }
    if (req.body.password && req.body.password !== "") {
      const salt = await bcrypt.genSalt(10);
      updatedFields.password = await bcrypt.hash(req.body.password, salt);
    }
    if (req.body.role && req.body.role !== "") {
      updatedFields.role = req.body.role;
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      { $set: updatedFields },
      { new: true }
    );

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: "Failed to update user" });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.userId);
    res.json(deletedUser);
  } catch (error) {
    res.status(500).json({ error: "Failed to delete user" });
  }
};
