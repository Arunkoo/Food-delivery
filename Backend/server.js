import express from "express";
import { connectDB } from "./config/db.js"; // Adjust the path as necessary
import dotenv from "dotenv";
import foodRoute from "./routes/foodRoute.js";
import cors from "cors";
import userRouter from "./routes/userRoute.js";
import cartRoute from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

dotenv.config();

const app = express();

// Connect to the database
connectDB();

// middleware
app.use(cors());
app.use(express.json());

// api endpoint..
app.use("/food", foodRoute);
app.use("/user", userRouter);
app.use("/cart", cartRoute);
app.use("/order", orderRouter);
app.use("/images", express.static("uploads"));

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
