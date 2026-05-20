import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import leadRoutes from "./routes/lead.routes";

dotenv.config();

const PORT = Number(process.env.PORT) || 5000;
const mongoUri = process.env.MONGO_URI?.trim();

if (!mongoUri) {
  console.error("MONGO_URI is missing. Add it to backend/.env (see .env.example).");
  process.exit(1);
}

if (
  !mongoUri.startsWith("mongodb://") &&
  !mongoUri.startsWith("mongodb+srv://")
) {
  console.error(
    'MONGO_URI must start with "mongodb://" or "mongodb+srv://". Check for extra spaces or quotes in .env.'
  );
  process.exit(1);
}

if (!process.env.JWT_SECRET?.trim()) {
  console.error("JWT_SECRET is missing. Add it to backend/.env");
  process.exit(1);
}

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/leads", leadRoutes);

mongoose
  .connect(mongoUri)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((error: { code?: number; codeName?: string; message?: string }) => {
    if (error.code === 8000 || error.codeName === "AtlasError") {
      console.error(
        "MongoDB auth failed: wrong username or password in MONGO_URI.\n" +
          "Atlas → Database Access → edit user → reset password → Connect → copy new URI into .env"
      );
      return;
    }
    if (error.message?.includes("querySrv ECONNREFUSED")) {
      console.error(
        "DNS SRV lookup failed (common on Windows). Use the standard mongodb:// URI from Atlas (not mongodb+srv://). See backend/.env.example."
      );
      return;
    }
    console.error("MongoDB connection error:", error.message ?? error);
  });

app.get("/", (_req, res) => {
  res.send("Backend Running");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
