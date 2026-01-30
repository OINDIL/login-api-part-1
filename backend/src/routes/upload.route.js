import { Router } from "express"
import { LoginMiddleware } from "../middleware/login.middleware.js"
import { UploadImage } from "../controllers/upload.controller.js";

const router = Router();

// /api/image/upload

router.post('upload', LoginMiddleware, UploadImage)




export default router;