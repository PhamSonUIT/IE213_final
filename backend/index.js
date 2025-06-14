import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";
import rootRoutes from "./src/routes/rootRoutes.js";

dotenv.config();

await connectDB();

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use("/", rootRoutes);

const PORT = process.env.BE_PORT || 3001;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
