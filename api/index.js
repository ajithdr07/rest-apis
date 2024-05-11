import express from "express";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import "dotenv/config";
import { fileURLToPath } from "url";
import path from "path";
import cors from "cors";

import appRoutes from "../routes/routes.js";
const app = express();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const filePath = path.join(__dirname, "..", "intro.txt");

app.use(cors());

app.get("/", (req, res) => {
  res.sendFile(filePath);
});

app.use(express.json());
app.use(cookieParser());
app.use("/api", appRoutes);

app.use((req, res, next) => {
  return res.status(404).send("Resource Not Found");
});

mongoose
  .connect(process.env.MONGO_CONNECTION_STRING)
  .then(() => {
    console.log("DB connected");
    app.listen(process.env.PORT, () =>
      console.log(`Server is running on PORT: ${process.env.PORT}`)
    );
  })
  .catch((err) => console.log("Something went wrong - ", err));
