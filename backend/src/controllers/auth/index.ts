// src/controllers/authController.ts
import { Request, Response } from "express";
import { User } from "../../models";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const generateToken = (userId: number, userType: string) => {
  return jwt.sign({ id: userId, userType: userType }, process.env.JWT_SECRET!, {
    expiresIn: "1h",
  });
};

export const register = async (req: Request, res: Response) => {
  const { name, email, password, userType, profilePic, status } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      userType,
      profilePic,
      status,
    });

    return res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        userType: user.userType,
        status: user.status,
        profilePic: user.profilePic,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Error registering user", error });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user.id, user.userType);

    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        userType: user.userType,
        name: user.name,
        email: user.email,
        profilePic: user.profilePic,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Error logging in", error });
  }
};
