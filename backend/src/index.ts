// src/index.ts
import dotenv from "dotenv";
dotenv.config();
import app from "./app";
import { connectDB } from "./utils/db";

const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI;

async function start() {
  if (!MONGO_URI) {
    throw new Error("MONGO_URI is not defined in environment variables");
  }
  await connectDB(MONGO_URI);
  app.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}`)
  );
}

start().catch((err) => {
  console.error(err);
  process.exit(1);
});
