const express = require("express");
const router = express.Router();

const controller = require("../controllers/user.controller");

// Create a new user
router.post("/", controller.createUser);

// Get all users

router.get("/", controller.getAllUsers);

// Get user by ID
router.get("/:userId", controller.getUserById);

// Login user
router.post("/login", controller.loginUser);

// Update user
router.put("/:userId", controller.updateUser);

// Delete user
router.delete("/:userId", controller.deleteUser);

module.exports = router;
