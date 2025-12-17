import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config()


const resend = new Resend(process.env.RESEND_KEY);


export const ResendMail = async () => {
    const { data, error } = await resend.emails.send({
        from: 'Acme <onboarding@resend.dev>',
        to: ['oindilgolder303@gmail.com'],
        subject: 'Hello World',
        html: '<strong>It works!</strong>',
    });

    if (error) {
        return false;
    }

    return true;
};