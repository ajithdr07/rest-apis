import express from "express";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import "dotenv/config";

import appRoutes from "./routes/routes.js";
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/api", appRoutes);

mongoose
  .connect(process.env.MONGO_CONNECTION_STRING)
  .then(() => {
    console.log("DB connected");
    app.listen(process.env.PORT, () =>
      console.log(`Server is running on PORT: ${process.env.PORT}`)
    );
  })
  .catch((err) => console.log("Something went wrong - ", err));
