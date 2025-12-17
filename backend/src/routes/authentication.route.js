import { Router } from "express";
import { checkAuth, SignIn, SignUp, VerifyEmail } from "../controllers/authentication.controller.js";
import { LoginMiddleware } from "../middleware/login.middleware.js";

const router = Router();

router.post("/signin", SignIn);
router.post("/signup", SignUp)
router.post("/verify-email", VerifyEmail);
router.get("/auth-check", LoginMiddleware, checkAuth);


export default router;