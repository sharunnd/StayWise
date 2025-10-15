// src/routes/bookings.ts
import express from "express";

import { requireAuth, requireAdmin, AuthRequest } from "../middleware/auth";
import { Booking } from "../models/Bookings";

const router = express.Router();

// POST /bookings  (create a booking) - auth required
router.post("/", requireAuth, async (req: AuthRequest, res) => {
  const { propertyId, startDate, endDate, guests, image } = req.body;
  if (!propertyId || !startDate || !endDate)
    return res.status(400).json({ message: "Missing fields" });

  const booking = new Booking({
    user: req.user!.id,
    property: propertyId,
    startDate: new Date(startDate),
    endDate: new Date(endDate),
    guests: guests || 1,
    image,
  });

  await booking.save();
  res.status(201).json({ booking });
});

// GET /bookings/my  - user can see their bookings
router.get("/my", requireAuth, async (req: AuthRequest, res) => {
  const bookings = await Booking.find({ user: req.user!.id })
    .sort({ createdAt: -1 })
    .populate("property");
  res.json({ bookings });
});

// GET /bookings  - admin can see all bookings
router.get("/", requireAdmin, async (req, res) => {
  const bookings = await Booking.find().populate("property").populate("user");
  res.json({ bookings });
});

export default router;
