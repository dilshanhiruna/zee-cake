const Tutorial = require("../models/tutorial.model");

exports.createTutorial = async (req, res) => {
  try {
    const { title, description, published, url } = req.body;

    const tutorial = new Tutorial({
      title,
      description,
      published,
      url,
    });
    const savedTutorial = await tutorial.save();

    res.status(201).json(savedTutorial);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to create tutorial" });
  }
};

exports.getAllTutorials = async (req, res) => {
  try {
    const tutorials = await Tutorial.find();
    res.json(tutorials);
  } catch (error) {
    res.status(500).json({ error: "Failed to get tutorials" });
  }
};

exports.getTutorialById = async (req, res) => {
  try {
    const tutorial = await Tutorial.findById(req.params.id);

    if (!tutorial) {
      return res.status(404).json({ error: "Tutorial not found" });
    }
    res.json(tutorial);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to get tutorial" });
  }
};

exports.updateTutorial = async (req, res) => {
  try {
    const { title, description, published, url } = req.body;
    const tutorial = await Tutorial.findByIdAndUpdate(
      req.params.id,
      { title, description, published, url },
      { new: true }
    );
    if (!tutorial) {
      return res.status(404).json({ error: "Tutorial not found" });
    }
    res.json(tutorial);
  } catch (error) {
    res.status(500).json({ error: "Failed to update tutorial" });
  }
};

exports.deleteTutorial = async (req, res) => {
  try {
    const { id } = req.params;

    const tutorial = await Tutorial.findById(id);

    if (!tutorial) {
      return res.status(404).json({ error: "Tutorial not found" });
    }

    await Tutorial.findByIdAndDelete(id);
    res.json({ message: "Tutorial deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete tutorial" });
  }
};
