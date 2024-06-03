// db/connection.js

const mongoose = require("mongoose");
const MONGO_URI =
  "mongodb+srv://anythingwithzee:IJGC5ryFfkYYhYQv@cluster0.obsfmec.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit the process with a failure code
  }
};

module.exports = connectDB;
