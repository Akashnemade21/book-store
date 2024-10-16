// src/middlewares/authMiddleware.ts
import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

import dotenv from "dotenv";

dotenv.config();

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    jwt.verify(authHeader, process.env.JWT_SECRET!, (err, decodedToken) => {
      if (err) {
        return res.sendStatus(403);
      }
      const user = decodedToken as JwtPayload;
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json({ message: "Unauthorized access" });
  }
};
