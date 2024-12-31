import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import cors from "cors";
import weaponRoutes from "./routes/weapon.route.js";
import characterRoutes from "./routes/character.route.js";
import artifactRoutes from "./routes/artifact.route.js";

dotenv.config();
const app = express();

app.use(cors({
    origin: ["http://localhost:5173", "https://angela2334.imgbb.com"],
}));

app.use(express.json());

app.use("/api/characters", characterRoutes);
app.use("/api/weapons", weaponRoutes);
app.use("/api/artifacts", artifactRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log("Server is running on PORT:" + PORT);
    connectDB();
});
