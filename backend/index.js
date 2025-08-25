import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./db/connectDB.js";
import authRoutes from "./routes/auth.route.js";

dotenv.config();

const app = express();

app.get("/", (req, res) => {
  res.send("Homepage");
});

app.use("/api/auth", authRoutes);

app.listen(5000, () => {
  connectDB();
  console.log("Server is running on server 5000");
});
