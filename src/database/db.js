import mongoose from "mongoose";
require("dotenv").config();

const MONGODB_URL = process.env.MONGODB_URL;

const connectDB = async () => {
  try {
    // console.log(MONGODB_URL,"mongo db url");
    await mongoose.connect(MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(MONGODB_URL, "ert");
    console.error(error, "Error connecting to MongoDB:");
  }
};

module.exports = connectDB;
