const Cake = require("../models/cake.model");

exports.createCake = async (req, res) => {
  try {
    const { name, description, price, image, type, calories, weight } =
      req.body;

    const cake = new Cake({
      name,
      description,
      price,
      image,
      type,
      calories,
      weight,
    });
    const savedCake = await cake.save();

    res.status(201).json(savedCake);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to create cake" });
  }
};

exports.getAllCakes = async (req, res) => {
  try {
    const cakes = await Cake.find();
    res.json(cakes);
  } catch (error) {
    res.status(500).json({ error: "Failed to get cakes" });
  }
};

exports.getCakeById = async (req, res) => {
  try {
    const cake = await Cake.findById(req.params.id);

    if (!cake) {
      return res.status(404).json({ error: "Cake not found" });
    }
    res.json(cake);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to get cake" });
  }
};

exports.updateCake = async (req, res) => {
  try {
    const { name, description, price, image, type, calories, weight } =
      req.body;
    const cake = await Cake.findByIdAndUpdate(
      req.params.id,
      { name, description, price, image, type, calories, weight },
      { new: true }
    );
    if (!cake) {
      return res.status(404).json({ error: "Cake not found" });
    }
    res.json(cake);
  } catch (error) {
    res.status(500).json({ error: "Failed to update cake" });
  }
};

exports.deleteCake = async (req, res) => {
  try {
    const cake = await Cake.findByIdAndDelete(req.params.id);
    if (!cake) {
      return res.status(404).json({ error: "Cake not found" });
    }
    res.json(cake);
  } catch (error) {
    res.status(500).json({ error: "Failed to delete cake" });
  }
};
