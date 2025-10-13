// src/seed.ts
import dotenv from "dotenv";
dotenv.config();
import { connectDB } from "./utils/db";
import { Property } from "./models/Property";
import { User } from "./models/User";
import bcrypt from "bcryptjs";

async function seed() {
  await connectDB(process.env.MONGO_URI!);
  await Property.deleteMany({});
  await User.deleteMany({});

  const properties = [
    { title: "SeaView Villa", description: "Nice sea view", pricePerNight: 200, images: [], location: "Goa" },
    { title: "Hilltop Cottage", description: "Quiet and cosy", pricePerNight: 120, images: [], location: "Ooty" }
  ];
  await Property.insertMany(properties);

  const admin = new User({
    email: "admin@staywise.com",
    password: await bcrypt.hash("adminpass", 10),
    role: "admin",
    name: "Admin"
  });
  await admin.save();

  console.log("Seed complete.");
  process.exit(0);
}

seed();
