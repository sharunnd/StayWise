// src/routes/properties.ts
import express from "express";
import { Property } from "../models/Property";

const router = express.Router();

// GET /properties
router.get("/", async (req, res) => {
  const properties = await Property.find().limit(50);
  res.json({ properties });
});

// GET /properties/:id
router.get("/:id", async (req, res) => {
  const prop = await Property.findById(req.params.id);
  if (!prop) return res.status(404).json({ message: "Not found" });
  res.json({ property: prop });
});

export default router;
