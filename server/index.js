import dotenv from "dotenv";
dotenv.config();
import app from "./src/app.js";
import { connectToDB } from "./src/db/db.js";
import authRouter from "./src/routes/auth.routers.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import userRouter from "./src/routes/user.routers.js";
import interviewRouter from "./src/routes/interview.routers.js";
import paymentRouter from "./src/routes/payment.routers.js";
import careerRouter from "./src/routes/career.routers.js";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // max requests per IP
  message: {
    success: false,
    message: "Too many requests, please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

app.set("trust proxy", 1);
app.disable("x-powered-by"); //Prevents attackers from knowing i am using Express
//create connectivity btw client and server
app.use(
  cors({
    origin: "http://localhost:5173", //if request is coming from this origin then only allow it to access server accept request from this origin url
    credentials: true,
  }),
);
app.use(
  helmet({
    contentSecurityPolicy: false,
  }),
);
app.use(limiter);
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/interview", interviewRouter);
app.use("/api/payment", paymentRouter);
app.use("/api/career", careerRouter);
connectToDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
