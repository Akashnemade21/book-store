import { Router } from "express";

import {
  createReview,
  getReviewByUserId,
  getReviewByBookId,
  deleteReviewById,
  updateReview,
} from "../../controllers/reviews";
import { authMiddleware } from "../../middlewares/authMiddleware";

const router = Router();

router.get("/user/:id", authMiddleware, getReviewByUserId);

router.get("/book/:id", authMiddleware, getReviewByBookId);

router.post("/", authMiddleware, createReview);

router.delete("/:id", authMiddleware, deleteReviewById);

router.put("/:id", authMiddleware, updateReview);

export default router;
