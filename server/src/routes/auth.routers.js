import app from "../app.js";
import express from "express";
const authRouter = express.Router();
import { googleAuth, logout } from "../controllers/auth.controllers.js";

authRouter.post("/google", googleAuth);
authRouter.get("/logout", logout);

export default authRouter;
