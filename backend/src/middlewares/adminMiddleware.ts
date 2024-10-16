// src/middlewares/authMiddleware.ts
import { Request, Response, NextFunction } from "express";
import { getUserByIdInt } from "../controllers/admin";
import dotenv from "dotenv";
import { ROLE } from "../models/User";

dotenv.config();

export const adminMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const resp: any = await getUserByIdInt(req.user?.id);

  if (resp.userType === ROLE.admin) {
    next();
  } else {
    return res.status(403).json({ message: "Unauthorized access" });
  }
};
