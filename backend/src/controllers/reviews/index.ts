// src/controllers/authController.ts
import { Request, Response } from "express";
import { Review } from "../../models";

export const getReviews = async (req: Request, res: Response) => {
  try {
    const reviewsList = await Review.findAll({});
    if (!reviewsList || !reviewsList.length) {
      return res.status(400).json({ message: "No reviews found" });
    }

    return res.status(200).json({
      message: "Fetch successful",
      reviews: reviewsList,
    });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching reviews", error });
  }
};

export const createReview = async (req: Request, res: Response) => {
  req.body.date = new Date(req.body.date);
  const { rating, bookId, reviewText, date } = req.body;
  let userId = req.user?.id;

  try {
    const review = await Review.create({
      rating,
      bookId,
      userId,
      reviewText,
      date,
    });

    res.status(200).json({
      message: "Review created successlfully",
      review: JSON.parse(JSON.stringify(review)),
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching review", error });
  }
};

export const getReviewById = async (req: Request, res: Response) => {
  const reviewId = req.params.id;

  try {
    const review = await Review.findByPk(reviewId, {});

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.status(200).json({
      message: "Fetch successlful",
      review: JSON.parse(JSON.stringify(review)),
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching review", error });
  }
};

export const getReviewByUserId = async (req: Request, res: Response) => {
  try {
    const review = await Review.findAll({ where: { userId: req.user?.id } });

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.status(200).json({
      message: "Fetch successlful",
      review: JSON.parse(JSON.stringify(review)),
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching review", error });
  }
};

export const getReviewByBookId = async (req: Request, res: Response) => {
  const bookId = Number(req.params.id);

  try {
    const review = await Review.findAll({ where: { bookId: bookId } });

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.status(200).json({
      message: "Fetch successlful",
      reviews: JSON.parse(JSON.stringify(review)),
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching review", error });
  }
};

export const deleteReviewById = async (req: Request, res: Response) => {
  const reviewId = req.params.id;

  try {
    const review = await Review.findByPk(reviewId);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    await review.destroy();
    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting review", error });
  }
};

export const updateReview = async (req: Request, res: Response) => {
  req.body.publicationDate = new Date(req.body.publicationDate);
  const { id } = req.params;
  const { rating, reviewText, date } = req.body;

  try {
    const review = await Review.findByPk(id);

    if (req.user?.id === review?.userId) {
      if (!review) {
        return res.status(404).json({ message: "Review not found" });
      }
      review.rating = rating;
      review.reviewText = reviewText;
      review.date = date;

      await review.save();

      return res.status(200).json({
        message: "Review updated successfully",
        review: JSON.parse(JSON.stringify(review)),
      });
    } else {
      return res.status(400).json({
        message: "Review does not belongs to you",
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error updating review" });
  }
};
