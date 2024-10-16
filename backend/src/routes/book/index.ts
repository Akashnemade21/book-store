import { Router } from "express";

import {
  getBooks,
  createBook,
  getBookById,
  deleteBookById,
  updateBook,
} from "../../controllers/books";
import { authMiddleware } from "../../middlewares/authMiddleware";
import { adminMiddleware } from "../../middlewares/adminMiddleware";

const router = Router();

router.get("/", authMiddleware, getBooks);

router.get("/:id", authMiddleware, getBookById);

router.post("/", authMiddleware, adminMiddleware, createBook);

router.delete("/:id", authMiddleware, adminMiddleware, deleteBookById);

router.put("/:id", authMiddleware, adminMiddleware, updateBook);

export default router;
