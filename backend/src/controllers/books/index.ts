import { Sequelize } from "sequelize";
import { Request, Response } from "express";
import { Book, Review } from "../../models";

export const getBooks = async (req: Request, res: Response) => {
  try {
    const booksList = await Book.findAll({
      attributes: [
        "id",
        "title",
        "author",
        "publicationDate",
        "bookCover",
        [Sequelize.fn("AVG", Sequelize.col("reviews.rating")), "rating"],
        [Sequelize.fn("COUNT", Sequelize.col("reviews.id")), "reviewNum"],
      ],
      include: {
        model: Review,
        as: "reviews",
        attributes: [],
      },
      group: ["Book.id"],
    });

    // const booksList = await Book.findAll({
    //   // include: {
    //   //   model: Review,
    //   // },
    // });
    if (!booksList || !booksList.length) {
      return res.status(400).json({ message: "No books found" });
    }

    return res.status(200).json({
      message: "Fetch successful",
      books: booksList,
    });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching books", error });
  }
};

export const createBook = async (req: Request, res: Response) => {
  req.body.publicationDate = new Date(req.body.publicationDate);

  const { title, author, publicationDate, bookCover } = req.body;
  try {
    const book = await Book.create({
      title,
      author,
      publicationDate,
      bookCover,
    });

    res.status(200).json({
      message: "Book created successlfully",
      book: JSON.parse(JSON.stringify(book)),
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching book", error });
  }
};

export const getBookById = async (req: Request, res: Response) => {
  const bookId = req.params.id;

  try {
    const book = await Book.findByPk(bookId, {});

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json({
      message: "Fetch successlful",
      book: JSON.parse(JSON.stringify(book)),
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching book", error });
  }
};

export const getBookByIdInt = async (bookId: string) => {
  try {
    const book = await Book.findByPk(bookId, {});
    if (!book) {
      return null;
    }
    return JSON.parse(JSON.stringify(book));
  } catch (error) {
    throw error;
  }
};

export const deleteBookById = async (req: Request, res: Response) => {
  const bookId = req.params.id;

  try {
    const book = await Book.findByPk(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    await book.destroy();
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting book", error });
  }
};

export const updateBook = async (req: Request, res: Response) => {
  req.body.publicationDate = new Date(req.body.publicationDate);
  const { id } = req.params;
  const { title, author, publicationDate, bookCover } = req.body;

  try {
    const book = await Book.findByPk(id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    book.title = title;
    book.author = author;
    book.publicationDate = publicationDate;
    book.bookCover = bookCover;

    await book.save();

    return res.status(200).json({
      message: "Book updated successfully",
      book: JSON.parse(JSON.stringify(book)),
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error updating book" });
  }
};
