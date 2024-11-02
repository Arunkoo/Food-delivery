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
const corsOptions = {
  origin: [
    "https://https://food-delivery-frontend-kappa.vercel.app/",
    "https://https://food-delivery-admin12panel.vercel.app/",
  ],
  credentials: true,
};
app.use(express.json());
import cors from "cors";

app.use(cors(corsOptions));

// api endpoint..
app.use("/food", foodRoute);
app.use("/user", userRouter);
app.use("/cart", cartRoute);
app.use("/order", orderRouter);
app.use("/images", express.static("uploads"));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
