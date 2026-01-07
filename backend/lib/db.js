import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/Eco-finds`);
    console.log("Database connected to:", mongoose.connection.host);
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
};
