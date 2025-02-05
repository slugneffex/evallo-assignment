import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connect from "./dbConnection.js";
import { errorHandler } from "./utils/handle-error.js";
import authRoutes from "./routes/auth.route.js";
import eventRoutes from "./routes/event.route.js";
import cookieParser from "cookie-parser";
import isUser from "./middleware/auth.middleware.js";
dotenv.config();

const app = express();

//middleware
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    credentials: true,
    origin: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  })
);
app.use("/api/auth", authRoutes);
app.use("/api/event", isUser, eventRoutes);

app.use(errorHandler);

//database connection
connect();
//server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
