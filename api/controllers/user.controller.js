const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

exports.createUser = async (req, res) => {
  try {
    const { name, email, address, phone, password, role, province } = req.body;

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
      address,
      phone,
      province,
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
        address: user.address,
        province: user.province,
        phone: user.phone,
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

    // remove the password from the user object before sending it
    user.password = undefined;
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user" });
  }
};

exports.updateUser = async (req, res) => {
  try {
    // only update the fields that are passed in the request body
    // and if those are not empty strings
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
    if (req.body.address && req.body.address !== "") {
      updatedFields.address = req.body.address;
    }
    if (req.body.phone && req.body.phone !== "") {
      updatedFields.phone = req.body.phone;
    }
    if (req.body.province && req.body.province !== "") {
      updatedFields.province = req.body.province;
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      { $set: updatedFields },
      { new: true }
    );

    // send a jwt token
    const token = jwt.sign(
      {
        id: updatedUser._id,
        name: updatedUser.name,
        address: updatedUser.address,
        province: updatedUser.province,
        phone: updatedUser.phone,
        email: updatedUser.email,
        role: updatedUser.role,
      },
      "secret_zee_cake"
    );

    if (!token) {
      return res.status(500).json({ error: "Failed to create token" });
    }

    res.status(200).json({
      message: "successful",
      token,
      updatedUser,
    });
  } catch (error) {
    console.log(error);
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
