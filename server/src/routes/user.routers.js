import { isAuth } from "../middlewares/isAuth.middlewares.js";
import express from "express";
const userRouter = express.Router();
import { getCurrentUser } from "../controllers/user.controllers.js";

userRouter.get("/current-user", isAuth, getCurrentUser);

export default userRouter;
