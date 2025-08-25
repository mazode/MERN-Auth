import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected`);
  } catch (error) {
    console.log("Error connecting to MONGO", error.message);
    process.exit(1); // failure status code || 0 for success
  }
};
