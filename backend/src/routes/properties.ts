import express from "express";
import { Property } from "../models/Property";
import { upload } from "../middleware/upload";
import cloudinary from "../config/cloudinary";
const router = express.Router();

/**
 * POST /properties
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

// GET /properties/search
router.get("/search", async (req, res) => {
  const { location = "", page = 1, limit = 6, minPrice, maxPrice } = req.query;
  const skip = (Number(page) - 1) * Number(limit);

  const filter: any = {};
  if (location) filter.location = { $regex: location, $options: "i" };
  if (minPrice && Number(minPrice) > 0) filter.pricePerNight = { ...filter.pricePerNight, $gte: Number(minPrice) };
  if (maxPrice && Number(maxPrice) > 0) filter.pricePerNight = { ...filter.pricePerNight, $lte: Number(maxPrice) };

  const [properties, total] = await Promise.all([
    Property.find(filter).skip(skip).limit(Number(limit)),
    Property.countDocuments(filter),
  ]);

  res.json({ properties, total });
});


// GET /properties/:id
router.get("/:id", async (req, res) => {
  const prop = await Property.findById(req.params.id);
  if (!prop) return res.status(404).json({ message: "Not found" });
  res.json({ property: prop });
});

export default router;
