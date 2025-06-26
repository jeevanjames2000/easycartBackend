const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://jeevanjames2000:X2BfDtIJVbCCHMBO@jeevan.e2hrudn.mongodb.net/authDB?retryWrites=true&w=majority&appName=Jeevan"
    );
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
