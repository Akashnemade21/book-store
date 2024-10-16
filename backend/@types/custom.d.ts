import { JwtPayload } from "jsonwebtoken";
import { Request } from "express";

import { ROLE, STATUS } from "../src/models/User";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
      password: string;
      userType: ROLE;
      name: string;
      email: string;
      status: STATUS;
      profilePic?: string;
    }
  }
}
