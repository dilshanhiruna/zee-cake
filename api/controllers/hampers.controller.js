const GiftHamper = require("../models/hampers.model");

exports.createHamper = async (req, res) => {
  try {
    const { name, description, price, image, type } = req.body;

    const hamper = new GiftHamper({
      name,
      description,
      price,
      image,
      type,
    });
    const savedHamper = await hamper.save();

    res.status(201).json(savedHamper);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to create hamper" });
  }
};

exports.getAllHampers = async (req, res) => {
  try {
    const hampers = await GiftHamper.find();
    res.json(hampers);
  } catch (error) {
    res.status(500).json({ error: "Failed to get hampers" });
  }
};

exports.getHamperById = async (req, res) => {
  try {
    const hamper = await GiftHamper.findById(req.params.id);

    if (!hamper) {
      return res.status(404).json({ error: "Hamper not found" });
    }
    res.json(hamper);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to get hamper" });
  }
};

exports.updateHamper = async (req, res) => {
  try {
    const { name, description, price, image, type } = req.body;
    const hamper = await GiftHamper.findByIdAndUpdate(
      req.params.id,
      {
        name,
        description,
        price,
        image,
        type,
      },
      { new: true }
    );
    if (!hamper) {
      return res.status(404).json({ error: "Hamper not found" });
    }
    res.json(hamper);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to update hamper" });
  }
};

exports.deleteHamper = async (req, res) => {
  try {
    const hamper = await GiftHamper.findByIdAndDelete(req.params.id);
    if (!hamper) {
      return res.status(404).json({ error: "Hamper not found" });
    }
    res.json(hamper);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to delete hamper" });
  }
};
