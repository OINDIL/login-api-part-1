import jwt from 'jsonwebtoken';


export async function LoginMiddleware(req, res, next) {
    try {
        const auth_token = req.headers.authorization;

        if (!auth_token) {
            return res.status(404).json({
                success: false,
                message: "Bearer token not found"
            })
        }

        const token = auth_token.split(" ")[1]


        if (!token) {
            return res.status(404).json({ success: false, message: "User not authenticated" });
        }

        // 2. Verify the token with the signature!


        const decodedUser = jwt.verify(token, process.env.SECRET);

        req.user = decodedUser;

        if (!decodedUser) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }
        next(); // moves forward
    } catch (error) {
        res.json({ status: false, message: "User is not logged in " });
    }
}