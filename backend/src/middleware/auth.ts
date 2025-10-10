import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/token";

export interface AuthRequest extends Request {
  user?: { id: string; role: string };
}

export function requireAuth(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.cookies?.token;
    if (!token) return res.status(401).json({ message: "Not authenticated" });
    const payload = verifyToken(token) as any;
    req.user = { id: payload.id, role: payload.role };
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
}

export function requireAdmin(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  requireAuth(req, res, () => {
    if (req.user?.role !== "admin")
      return res.status(403).json({ message: "Admins only" });
    next();
  });
}
