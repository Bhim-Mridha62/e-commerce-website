import mongoose from "mongoose";
require("dotenv").config();

const MONGODB_URL =
  process.env.MONGODB_URL ||
  "mongodb+srv://bhimmridha62:2XoL4CGww3b8mZCI@cluster0.pfzffae.mongodb.net/?retryWrites=true&w=majority";

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
