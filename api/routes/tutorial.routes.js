const express = require("express");
const router = express.Router();

const controller = require("../controllers/tutorial.controller");

// Create a new tutorial
router.post("/", controller.createTutorial);

// Get all tutorials
router.get("/", controller.getAllTutorials);

// Get tutorial by ID
router.get("/:id", controller.getTutorialById);

// Update tutorial
router.put("/:id", controller.updateTutorial);

// Delete tutorial
router.delete("/:id", controller.deleteTutorial);

module.exports = router;
