import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();
import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";

//@General Description of what this is:
// server where the API connects and sets the connection of the database and the different routes I have defined

const port = process.env.PORT || 5000;

connectDB();

const app = express();

//Enable CORS middleware
app.use(cors());

//Body parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Cookie parser Middleware
app.use(cookieParser());



app.get("/", (req, res) => {
  res.send("API RUNNING..");
});

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server running at port ${port}`));
