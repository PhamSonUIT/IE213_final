import express from "express";
import cors from "cors";
import rootRoutes from "./routes/rootRoutes.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// Routes
app.use("/api", rootRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
