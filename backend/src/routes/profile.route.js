import { Router } from "express";
import { ProfileController } from "../controllers/profile.controller.js";
import { LoginMiddleware } from "../middleware/login.middleware.js";

export const profileRouter = Router();


profileRouter.get("/profile", LoginMiddleware, ProfileController);