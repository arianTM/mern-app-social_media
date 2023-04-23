// DEPENDENCIES
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// ROUTERS
import postRoutes from "./routes/posts.js";

// IMPORT ENV VARIABLES
dotenv.config();

// APP: server
const app = express();

// MIDDLEWARES
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use("/posts", postRoutes);

// DATABASE INFO
const CONNECTION_URL = process.env.MONGODB_CONNECTION_URL;

// PORT
const PORT = process.env.PORT || 5000;

// CONNECT TO DATABASE
mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error(err.message);
  });
