import { DataTypes, Model, Optional } from "sequelize";

import { sequelize } from "../config/database";

interface ReviewAttributes {
  id: number;
  rating: number;
  bookId: number;
  userId: number;
  reviewText: string;
  date: Date;
}

interface ReviewCreationAttributes extends Optional<ReviewAttributes, "id"> {}

class Review
  extends Model<ReviewAttributes, ReviewCreationAttributes>
  implements ReviewAttributes
{
  public id!: number;
  public rating!: number;
  public bookId!: number;
  public userId!: number;
  public reviewText!: string;
  public date!: Date;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Review.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    bookId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5,
      },
    },
    reviewText: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: "reviews",
  }
);

export default Review;
