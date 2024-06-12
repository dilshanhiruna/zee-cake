// app.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./db/connection"); // Import the connectDB function
const userRoutes = require("./routes/users.routes");
const cakeRoutes = require("./routes/cake.routes");
const customCakeRoutes = require("./routes/customcake.routes");
const workshopRoutes = require("./routes/workshop.routes");
const orderRoutes = require("./routes/order.routes");
const tutorialRoutes = require("./routes/tutorial.routes");
const hampersRoutes = require("./routes/hampers.routes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json({ limit: "1mb" }));
app.use(bodyParser.urlencoded({ limit: "1mb", extended: true }));

app.use(cors());

// Register API routes
app.use("/v1/api/user", userRoutes);
app.use("/v1/api/cakes", cakeRoutes);
app.use("/v1/api/customcakes", customCakeRoutes);
app.use("/v1/api/workshops", workshopRoutes);
app.use("/v1/api/orders", orderRoutes);
app.use("/v1/api/tutorials", tutorialRoutes);
app.use("/v1/api/giftHampers", hampersRoutes);

// Call the connectDB function to establish the MongoDB connection
connectDB();

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
