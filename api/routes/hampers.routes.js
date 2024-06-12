const express = require("express");
const router = express.Router();

const controller = require("../controllers/hampers.controller");

// Create a new hamper
router.post("/", controller.createHamper);

// Get all hampers
router.get("/", controller.getAllHampers);

// Get hamper by ID
router.get("/:id", controller.getHamperById);

// Update hamper
router.put("/:id", controller.updateHamper);

// Delete hamper
router.delete("/:id", controller.deleteHamper);

module.exports = router;
