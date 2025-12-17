import nodemailer from "nodemailer"

// uyov svji fush zgzh

// Create a test account or replace with real credentials.
const transporter = nodemailer.createTransport({
    host: process.env.MAIL_USER,
    port: process.env.MAIL_PORT,
    secure: process.env.MAIL_SECURE, // true for 465, false for other ports
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
    },
});

// Wrap in an async IIFE so we can use await.
const sendMail = async (email, otp) => {

    try {
        if (!email || !otp) return false;
        const info = await transporter.sendMail({
            from: 'Authentify - login with ease',
            to: email,
            subject: "Login with your otp",
            text: `OTP is ${otp}`, // plain‑text body
            html: `<b>Your otp for logging into Authentify is - ${otp}</b> <br>
            Now login with your otp <a href="http://localhost:5173/verify-account">Verify Account </a>
            `, // HTML body
        });

        console.log(info.messageId);

        return true;
    } catch (error) {
        return false;
    }

}

export { sendMail }