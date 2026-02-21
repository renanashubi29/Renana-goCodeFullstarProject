
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


dotenv.config({ path: path.join(__dirname, ".env") });

import express from "express";
import cors from "cors";
import { connectedDB } from "./DB/db.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());


app.use(express.static(path.join(__dirname, "client", "dist")));

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);


app.get(/^(?!\/api).+/, (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

const startServer = async () => {
  try {
   
    
    await connectedDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server running at port ${port}`);
      console.log(`🚀 View your app at: http://localhost:${port}`);
    });
  } catch (err) {
    console.error("Database connection error:", err.message);
  }
};

startServer();