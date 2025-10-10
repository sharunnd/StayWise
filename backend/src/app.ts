// src/app.ts
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth";
import propRoutes from "./routes/properties";
import bookingRoutes from "./routes/bookings";

const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:3000";

const app = express();

// Allow JSON body
app.use(express.json());

// cookies
app.use(cookieParser());

// CORS with credentials so httpOnly cookie works cross-origin (dev)
app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
  })
);

// routes
app.use("/auth", authRoutes);
app.use("/properties", propRoutes);
app.use("/bookings", bookingRoutes);

// healthcheck
app.get("/health", (req, res) => res.json({ ok: true }));

export default app;
