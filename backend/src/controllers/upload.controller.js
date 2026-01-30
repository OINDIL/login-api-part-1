import { cloudinary } from "../utils/cloudinary.js";

export async function UploadImage(req, res) {
    try {

        const { file } = req.body;

        if (!file) {
            return res.status(404).json({
                success: false,
                message: "Image not found"
            })
        }

        const uploadedImg = await cloudinary.uploader.upload(file);


        if (!uploadedImg.url) {
            return res.status(404).json({
                success: false,
                message: "Cannot upload to cloudinary"
            })
        }

        res.json({
            success: true,
            message: "File uploaded",
            url: uploadedImg.url
        })



    } catch (err) {
        console.error(err)
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}