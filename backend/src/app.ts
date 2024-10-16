import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import { sequelize } from "./config/database";
import User from "./models/User";
import Book from "./models/Books";
import Review from "./models/Review";

import authRoutes from "./routes/auth";
import userRoutes from "./routes/user";
import bookRoutes from "./routes/book";
import reviewRoutes from "./routes/review";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use("/auth", authRoutes);

app.use("/user", userRoutes);

app.use("/book", bookRoutes);

app.use("/review", reviewRoutes);

sequelize
  // .sync({ force: true })
  .sync({})
  .then((result) => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
