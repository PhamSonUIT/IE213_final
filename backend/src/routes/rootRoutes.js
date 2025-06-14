import express from "express";
import authRoutes from "./authRoutes.js";
import videoRoutes from "./videoRoutes.js";
import userRoutes from "./userRoutes.js";
const rootRoutes = express.Router();

rootRoutes.use("/auth", authRoutes);
rootRoutes.use("/video", videoRoutes);
rootRoutes.use("/user", userRoutes);

export default rootRoutes;
