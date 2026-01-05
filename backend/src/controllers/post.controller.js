import { ObjectId } from "mongodb";
import { db } from "../utils/db.js"

export async function CreatePost(req, res) {
    try {

        const { content } = req.body;

        if (!content) {
            return res.status(404).json({
                success: false,
                message: "Post can not be empty"
            })
        }


        if (content.split(" ").length > 10) {
            return res.json({
                success: false,
                message: "Your post is too lengthy!, reduce the size of content!"
            })
        }

        const newPost = await db.collection("posts").insertOne({
            content,
            userId: req.user.id
        })

        if (!newPost) {
            return res.json({
                success: false,
                message: "Your post is not created, please try again sometimes."
            })
        }


        res.json({
            success: true,
            message: "Your post has been shared successfully."
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}


// Get Posts
export async function GetPost(req, res) {
    try {

        const { user } = req
        const allUserPosts = await db.collection("posts").find({ userId: user.id }).toArray();

        res.json({
            success: true,
            posts: allUserPosts.map((data) => {
                return { content: data.content }
            })
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

