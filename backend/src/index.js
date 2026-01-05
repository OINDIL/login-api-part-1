import express from "express";
import { connectMongoDB } from "./utils/db.js";
import cors from "cors";
import dotenv from "dotenv";
import AuthenticationRouter from "./routes/authentication.route.js"
import { profileRouter } from "./routes/profile.route.js";
import postRouter from "./routes/post.route.js"

dotenv.config()



const app = express();
const PORT = 3000;
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:5173"]
}))

connectMongoDB(); // connect to mongoDB

app.get("/test", (req, res) => {
    res.json({
        message: "Secure data, logged in users can only access this"
    })
})


app.use("/api", AuthenticationRouter);
app.use("/", profileRouter);
app.use("/api/posts", postRouter);



app.listen(PORT, console.log(`Server running on http://localhost:${PORT}`))