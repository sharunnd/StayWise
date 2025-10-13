import express from "express";
import bcrypt from "bcryptjs";
import { User } from "../models/User";
import { signToken } from "../utils/token";
import { requireAuth } from "../middleware/auth";
import {Types} from "mongoose"


const router = express.Router();

// helper to set httpOnly cookie
function setTokenCookie(res: express.Response, token: string) {
  const isProd = process.env.NODE_ENV === "production";

  res.cookie("token", token, {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
}

// POST /auth/signup
router.post("/signup", async (req, res) => {
  const { email, password, name } = req.body;
  if (!email || !password) return res.status(400).json({ message: "Email and password required" });

  const existing = await User.findOne({ email });
  if (existing) return res.status(400).json({ message: "Email already in use" });

  const hashed = await bcrypt.hash(password, 10);
  const user = new User({ email, password: hashed, name });
  await user.save();

  const token = signToken({ id: (user._id as Types.ObjectId).toString(), role: user.role });
  setTokenCookie(res, token);

  return res.json({ user: { id: user._id, email: user.email, role: user.role, name: user.name } });
});


// POST /auth/login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: "Email and password required" });

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ message: "Invalid credentials" });

  const token = signToken({ id: (user._id as Types.ObjectId).toString(), role: user.role });
  setTokenCookie(res, token);

  return res.json({ user: { id: user._id, email: user.email, role: user.role, name: user.name } });
});


// POST /auth/logout
router.post("/logout", (req, res) => {
  try {
    const isProduction = process.env.NODE_ENV === "production";
    
    // Clear cookie with the SAME settings used in login
    res.cookie("token", "", {
      httpOnly: true,
      secure: isProduction, // MUST match login settings
      sameSite: isProduction ? "none" : "lax", // MUST match login settings
      expires: new Date(0), // Expire immediately
      path: "/",
    });

    res.json({ 
      ok: true,
      message: "Logged out successfully" 
    });
    
  } catch (error) {
   
    res.status(500).json({ 
      ok: false,
      message: "Logout failed" 
    });
  }
});

// GET /auth/me
router.get("/me", requireAuth, async (req: any, res) => {
  const user = await User.findById(req.user?.id).select("-password");
  return res.json({ user });
});

export default router;