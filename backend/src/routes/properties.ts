// src/routes/properties.ts
import express from "express";
import { Property } from "../models/Property";
import { upload } from "../middleware/upload";
import cloudinary from "../config/cloudinary";
const router = express.Router();


/**
 * POST /properties
 * Create property with Cloudinary images
 */
router.post("/add", upload.array("images"), async (req, res) => {
  try {
    const { title, description, pricePerNight, location } = req.body;
    if (!title || !description || !pricePerNight) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const files = req.files as Express.Multer.File[];
    const uploadedUrls: string[] = [];

    for (const file of files) {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: "staywise",
      });
      uploadedUrls.push(result.secure_url);
    }

    const property = new Property({
      title,
      description,
      pricePerNight,
      location,
      images: uploadedUrls,
    });

    await property.save();

    res.status(201).json({ message: "Property created", property });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create property" });
  }
});

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
