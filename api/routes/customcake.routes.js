const express = require("express");
const router = express.Router();

const controller = require("../controllers/customcake.controller");

// Create a new cake
router.post("/", controller.createCake);

// Get all cakes
router.get("/", controller.getCakes);

// Get cake by ID
router.get("/:cakeId", controller.getCake);

module.exports = router;
