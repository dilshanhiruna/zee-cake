const Cake = require("../models/customcake.model");

exports.createCake = async (req, res) => {
  const {
    image,
    category,
    flavor,
    topping,
    topper,
    decoration,
    message,
    extraDetails,
    deliveryDate,
    prefferedContact,
    price,
    weight,
    user,
    glutenFree,
    vegan,
    nutFree,
  } = req.body;

  if (
    !image ||
    !category ||
    !flavor ||
    !topping ||
    !decoration ||
    !message ||
    !deliveryDate ||
    !prefferedContact ||
    !price ||
    !weight ||
    !user
  ) {
    return res.status(400).json({ error: "Please fill all the fields" });
  }

  try {
    const cake = new Cake({
      user,
      image,
      flavor,
      category,
      topping,
      topper,
      decoration,
      weight,
      message,
      extraDetails,
      deliveryDate,
      prefferedContact,
      price,
      glutenFree,
      vegan,
      nutFree,
    });

    await cake.save();
    res.status(201).json({ message: "success" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getCakes = async (req, res) => {
  try {
    const cakes = await Cake.find().populate("user");
    res.status(200).json(cakes);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getCakesToDisplay = async (req, res) => {
  try {
    console.log("sada");
    const cakes = await Cake.find({
      status: {
        $ne: "Pending",
      },
    });

    console.log(cakes);
    res.status(200).json(cakes);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getCake = async (req, res) => {
  const { cakeId } = req.params;

  try {
    const cake = await Cake.findById(cakeId).populate("user");
    if (!cake) {
      return res.status(404).json({ error: "Cake not found" });
    }
    res.status(200).json(cake);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// upate the status of the cake
exports.updateCakeStatus = async (req, res) => {
  const { cakeId } = req.params;
  const { status } = req.body;

  try {
    const cake = await Cake.findById(cakeId);
    if (!cake) {
      return res.status(404).json({ error: "Cake not found" });
    }

    cake.status = status;
    await cake.save();
    res.status(200).json({ message: "Cake status updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// accept the cake
exports.acceptCake = async (req, res) => {
  const { cakeId } = req.params;

  try {
    const cake = await Cake.findById(cakeId);
    if (!cake) {
      return res.status(404).json({ error: "Cake not found" });
    }

    // check if the cake has already been accepted, if true make it false
    if (cake.accepted) {
      cake.accepted = false;
    } else {
      cake.accepted = true;
    }

    await cake.save();

    res.status(200).json({ message: "Cake accepted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// get orders of the user
exports.getUserCakes = async (req, res) => {
  const { userId } = req.params;
  try {
    const cakes = await Cake.find({ user: userId });

    res.status(200).json(cakes);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// delete the cake
exports.deleteCake = async (req, res) => {
  const { cakeId } = req.params;

  try {
    const cake = await Cake.findById(cakeId);
    if (!cake) {
      return res.status(404).json({ error: "Cake not found" });
    }

    await Cake.findByIdAndDelete(cakeId);

    res.status(200).json({ message: "Cake deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
