import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URL = process.env.MONGODB_URL;

if (!MONGODB_URL) {
  throw new Error('Please define the MONGODB_URL environment variable inside .env.local');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      bufferCommands: false, // Disable mongoose buffering in serverless environment
    }).then((mongoose) => {
      console.log("Connected to MongoDB");
      return mongoose;
    }).catch((error) => {
      console.error("Error connecting to MongoDB:", error);
      throw error;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
};

export default connectDB;
