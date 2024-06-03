import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
  if (!process.env.MONGO_URI) return console.log("MONGO_URI not found");

  if (isConnected) return console.log("MongoDB is already connected");

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
    isConnected = true;
  } catch (error) {
    console.error(error);
  }
};
