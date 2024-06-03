const express = require("express");
const router = express.Router();

const controller = require("../controllers/cake.controller");

// Create a new cake
router.post("/", controller.createCake);

// Get all cakes
router.get("/", controller.getAllCakes);

// Get cake by ID
router.get("/:id", controller.getCakeById);

// Update cake
router.put("/:id", controller.updateCake);

// Delete cake
router.delete("/:id", controller.deleteCake);

module.exports = router;
