const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    console.log("URI =", process.env.MONGO_URI);
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("Mongo Error:", error.message);
  }
};

module.exports = connectDB;