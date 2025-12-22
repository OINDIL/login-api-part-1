import { ResendMail } from "../utils/resend.js";
import jwt from "jsonwebtoken"
import crypto from "node:crypto";
import { db } from "../utils/db.js";

import dotenv from 'dotenv'
import { ObjectId } from "mongodb";

dotenv.config();


export async function SignUp(req, res) {
    try {
        const { email, name, password, phone } = req.body;


        // check for data

        if (!email || !name || !password || !phone) {
            return res.status(404).json({
                success: false,
                message: "All fields are required"
            })
        }

        // check if email is already present in db or not
        const existingUser = await db.collection("users").findOne({
            email: email
        })

        if (existingUser) {
            return res.status(401).json({
                success: false,
                message: "User already exists"
            })
        }


        // password hashing
        const hash = crypto.createHash("sha256");

        hash.update(password);

        const hashedPass = hash.digest("hex")



        // otp generation

        const newOtp = (1000 + Math.random() * 9000).toFixed();

        // new otp - 5800 
        // 58 + 1000 = 6800


        const newUser = await db.collection("users").insertOne({
            name: name,
            password: hashedPass,
            email: email,
            phone: phone,
            isEmailVerified: false,
            otp: newOtp,
        })

        if (!newUser) {
            return res.status(404).json({
                success: false,
                message: "Error creating new user"
            })
        }

        // const mailSent = await sendMail(email, newOtp);
        const mailSent = await ResendMail()

        if (!mailSent) {
            return res.status(401).json({ status: false, message: "Mail not sent" });
        }


        res.json({
            success: true,
            message: "Signed up successfully"
        });

    } catch (error) {
        console.log("Error:", error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

export async function VerifyEmail(req, res) {
    try {

        const { email, otp } = req.body;


        if (!email || !otp) {
            return res.status(404).json({
                success: false,
                message: "All fields are required"
            })
        }


        const isUserValid = await db.collection("users").findOne({ email })


        if (!isUserValid) {
            return res.status(401).json({
                success: false,
                message: "User not found"
            })
        }


        if (isUserValid.otp !== otp) {
            return res.status(400).json({
                success: false,
                message: "Otp does not match"
            })
        }


        const verifiedEmail = await db.collection("users").findOneAndUpdate({ _id: isUserValid._id }, { $set: { isEmailVerified: true } })

        if (!verifiedEmail) {
            return res.status(400).json({
                success: false,
                message: "Can not verify the email"
            })
        }

        // success message
        res.json({
            success: true,
            message: "Email Verified"
        })
    } catch (error) {

        console.log(error)
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

export async function SignIn(req, res) {

    try {

        console.log("running")

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(404).json({
                success: false,
                message: "All fields are required"
            })
        }


        const isUserValid = await db.collection("users").findOne({ email })

        if (!isUserValid) {
            return res.status(401).json({
                success: false,
                message: "User not found"
            })
        }

        const hash = crypto.createHash("sha256");

        hash.update(password);

        const hashedPass = hash.digest("hex")


        if (hashedPass !== isUserValid.password) {
            return res.status(401).json({
                success: false,
                message: "Passwords do not match"
            })
        }
        const SECRET = process.env.SECRET;
        const token = jwt.sign({ id: isUserValid._id }, SECRET);
        console.log(token);

        res.json({
            success: true,
            message: "Login Successful",
            token
        })
    } catch (error) {
        console.log(error)
    }
}


export async function checkAuth(req, res) {
    res.json({ success: true, message: "User Authenticated" })
}

export async function getProfile(req, res) {
    try {

        const user = req.user;

        console.log(user)

        const userData = await db.collection("users").findOne({ _id: new ObjectId(user.id) })


        if (!userData) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            })
        }

        const protectedUserData = {
            name: userData.name,
            email: userData.email,
            phoneNo: userData.phone
        }

        res.json({
            success: true,
            message: "User data",
            user: protectedUserData
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}