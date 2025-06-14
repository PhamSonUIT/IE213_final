import express from "express";
import { signIn, signUp, signOut } from "../controller/authController.js";
const authRoutes = express.Router();

authRoutes.post("/signin", signIn);
authRoutes.post("/signup", signUp);
authRoutes.post("/signout", signOut);
export default authRoutes;
