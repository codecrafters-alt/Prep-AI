import express from "express";
import { isAuth } from "../middlewares/isAuth.middlewares.js";
const careerRouter = express.Router();
import { getCareerCopilotResponse } from "../controllers/career.controllers.js";
import { upload } from "../middlewares/multer.js";
careerRouter.post(
  "/copilot",
  isAuth,
  upload.single("resume"),
  getCareerCopilotResponse,
);

export default careerRouter;
