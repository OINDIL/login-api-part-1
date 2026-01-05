import { Router } from "express";
import { LoginMiddleware } from "../middleware/login.middleware.js";
import { CreatePost, GetPost } from "../controllers/post.controller.js";

const router = Router();

/**
 * Create a post
 * HTTP Method - POST
 * - DB insertOne method
 */

router.post("/create", LoginMiddleware, CreatePost);


/**
 * Update
 * HTTP Method - PUT, PATCH
 */



/**
 * Delete a Post
 * HTTP Method - DELETE
 */


/**
 * Get posts
 * HTTP Method - GET
 */

router.get("/all", LoginMiddleware, GetPost);

export default router;