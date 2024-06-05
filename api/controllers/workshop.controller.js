const { Workshop, Registration } = require("../models/workshop.model");

exports.createWorkshop = async (req, res) => {
  try {
    const { title, description, date, link, price, instructor, image } =
      req.body;

    const workshop = new Workshop({
      title,
      description,
      date,
      link,
      price,
      instructor,
      image,
    });
    const savedWorkshop = await workshop.save();

    res.status(201).json(savedWorkshop);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to create workshop" });
  }
};

exports.getAllWorkshops = async (req, res) => {
  try {
    const workshops = await Workshop.find();
    res.json(workshops);
  } catch (error) {
    res.status(500).json({ error: "Failed to get workshops" });
  }
};

exports.getWorkshopById = async (req, res) => {
  try {
    const workshop = await Workshop.findById(req.params.workshopId);

    if (!workshop) {
      return res.status(404).json({ error: "Workshop not found" });
    }
    res.json(workshop);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to get workshop" });
  }
};

exports.updateWorkshop = async (req, res) => {
  try {
    const { title, description, date, link, price, instructor, image } =
      req.body;
    const workshop = await Workshop.findByIdAndUpdate(
      req.params.workshopId,
      { title, description, date, link, price, instructor, image },
      { new: true }
    );
    if (!workshop) {
      return res.status(404).json({ error: "Workshop not found" });
    }
    res.json(workshop);
  } catch (error) {
    res.status(500).json({ error: "Failed to update workshop" });
  }
};

exports.deleteWorkshop = async (req, res) => {
  try {
    const workshop = await Workshop.findByIdAndDelete(req.params.workshopId);
    if (!workshop) {
      return res.status(404).json({ error: "Workshop not found" });
    }
    res.json({ message: "Workshop deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete workshop" });
  }
};

exports.registerWorkshop = async (req, res) => {
  try {
    const { user, workshop, attendees } = req.body;
    const registration = new Registration({
      user,
      workshop,
      attendees: Number(attendees),
    });
    const savedRegistration = await registration.save();
    res.status(201).json(savedRegistration);
  } catch (error) {
    res.status(500).json({ error: "Failed to register for workshop" });
  }
};
