import { Router } from "express";

import { authMiddleware } from "../../middlewares/authMiddleware";
import { adminMiddleware } from "../../middlewares/adminMiddleware";

import { getUsers, getUserById, deleteUserById } from "../../controllers/admin";

const router = Router();

router.get("/", authMiddleware, adminMiddleware, getUsers);

router.get("/:id", authMiddleware, adminMiddleware, getUserById);

router.delete("/", authMiddleware, adminMiddleware, deleteUserById);

export default router;
