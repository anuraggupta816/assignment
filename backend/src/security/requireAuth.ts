import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export interface AuthPayload {
  id: number;
  email: string;
}

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  try {
    console.log("req.headers", req.headers);
    const authHeader = req.headers.authorization;
    let token: string | undefined;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.substring(7);
    } else if (req.cookies?.token) {
      token = req.cookies.token;
    }
    console.log("\n\n\n token::", token);
    if (!token) return res.status(401).json({ message: "Unauthorized" });
    const payload = jwt.verify(
      token,
      process.env.JWT_SECRET || "dev_secret"
    ) as AuthPayload;
    (req as any).user = payload;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
}
