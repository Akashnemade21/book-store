import { Request, Response } from "express";
import { User } from "../../models";
import bcrypt from "bcryptjs";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const usersList = await User.findAll({
      attributes: { exclude: ["password"] },
    });
    if (!usersList || !usersList.length) {
      return res.status(400).json({ message: "No user found" });
    }

    return res.status(200).json({
      message: "Fetch successlful",
      users: usersList,
    });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching users", error });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  const userId = req.body.id;

  try {
    const user = await User.findByPk(userId, {
      attributes: { exclude: ["password"] },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Fetch successlful",
      user: JSON.parse(JSON.stringify(user)),
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error });
  }
};

export const getUserByIdInt = async (id: number) => {
  try {
    const user = await User.findByPk(id, {
      attributes: {
        exclude: ["password"],
      },
    });
    if (!user) {
      return null;
    }
    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    throw error;
  }
};

export const deleteUserById = async (req: Request, res: Response) => {
  const userId = req.params.id;

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.destroy();
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email, password, userType, profilePic, status } = req.body;

  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user.name = name;
    user.email = email;
    user.password = hashedPassword;
    user.userType = userType;
    user.profilePic = profilePic;
    user.status = status;

    await user.save();

    return res.status(200).json({
      message: "User updated successfully",
      book: JSON.parse(JSON.stringify(user)),
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error updating user" });
  }
};
