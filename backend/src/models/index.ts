import Review from "./Review";
import Book from "./Books";
import User from "./User";

Review.belongsTo(User, { foreignKey: "userId" });

Book.hasMany(Review, {
  foreignKey: "bookId",
  as: "reviews",
});

Review.belongsTo(Book, {
  foreignKey: "bookId",
  as: "book",
});

console.log("Association done");

export { User, Book, Review };
