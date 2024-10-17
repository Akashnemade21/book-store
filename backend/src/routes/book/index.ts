import { Router } from "express";

import {
  getBooks,
  createBook,
  updateBook,
  getBookById,
  deleteBookById,
  getBookByIdWithReviews,
} from "../../controllers/books";
import { authMiddleware } from "../../middlewares/authMiddleware";
import { adminMiddleware } from "../../middlewares/adminMiddleware";

const router = Router();

router.get("/", authMiddleware, getBooks);

router.get("/:id", authMiddleware, getBookByIdWithReviews);

router.post("/", authMiddleware, adminMiddleware, createBook);

router.put("/:id", authMiddleware, adminMiddleware, updateBook);

router.delete("/:id", authMiddleware, adminMiddleware, deleteBookById);

export default router;
