import { Router } from "express"
import { LoginMiddleware } from "../middleware/login.middleware.js"
import { UploadImage } from "../controllers/upload.controller.js";
import multer from "multer";

const uploadMiddleware = multer({ dest: "uploads/" });



const router = Router();

// /api/image/upload

router.post('/upload', LoginMiddleware, uploadMiddleware.single('file'), UploadImage)




export default router;