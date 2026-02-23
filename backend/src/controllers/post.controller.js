import { ObjectId } from "mongodb";
import { db } from "../utils/db.js"

export async function CreatePost(req, res) {
    try {

        const { content, imageUrl } = req.body;

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
            imageUrl,
            userId: req.user.id,
            createdAt: new Date().toLocaleString()
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
        const allPosts = await db.collection("posts").find().toArray()

        const allPostsWithAuthor = await Promise.all(allPosts.map(async (data) => {
            const postAuthors = await db.collection("users").findOne({ _id: new ObjectId(data.userId) })

            return {
                userName: postAuthors.name,
                id: data._id,
                content: data.content,
                imageUrl: data.imageUrl,
                likeCount: data.likeCount,
                dateTime: data.createdAt,
            }
        }))

        res.json({
            success: true,
            posts: allPostsWithAuthor.reverse()
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}



export async function UpdateLikeCount(req, res) {
    try {
        const { postId } = req.body;
        const { id } = req.user;




        if (!postId) {
            return res.status(404).json({
                success: false,
                message: "Post not found"
            })
        }


        const userAlreadyLiked = await db.collection('posts').findOne({
            _id: new ObjectId(postId),
            likedBy: id
        })


        if (userAlreadyLiked) {
            return res.status(404).json({
                success: false,
                message: "You have already liked this post"
            })
        }

        const postData = await db.collection("posts").findOneAndUpdate({
            _id: new ObjectId(postId)
        }, {
            $inc: {
                "likeCount": 1
            },
            $push: {
                "likedBy": id
            }
        })


        if (!postData) {
            return res.status(404).json({
                success: false,
                message: "Post not found"
            })
        }

        res.json({
            success: true,
            message: "Liked post"
        })


    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}