const express = require("express");
const router = express.Router();

const controller = require("../controllers/workshop.controller");

// Create a new workshop
router.post("/", controller.createWorkshop);

// Get all workshops
router.get("/", controller.getAllWorkshops);

// Get workshop by ID
router.get("/:workshopId", controller.getWorkshopById);

// Update workshop status
router.put("/:workshopId", controller.updateWorkshop);

// delete workshop
router.delete("/:workshopId", controller.deleteWorkshop);

// Register for a workshop
router.post("/:workshopId/register", controller.registerWorkshop);

module.exports = router;
