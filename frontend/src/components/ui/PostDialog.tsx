
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Input } from "./input";
import { Textarea } from "./textarea";
import { Button } from "./button";
import { useRef, useState, type ChangeEvent } from "react";
import { toast } from "sonner";
import { Upload } from "lucide-react";


interface Props {
    user: {
        name: string,
        phoneNo: string,
        email: string
    },
    onPostSuccess: () => void
}

function PostDialog({ user, onPostSuccess }: Props) {

    const fileSelectionRef = useRef<HTMLInputElement | null>(null);


    const [post, setPost] = useState<string | null>(null);
    const [previewImage, setPreviewImage] = useState('');

    function selectFile() {
        if (!fileSelectionRef.current) return;
        fileSelectionRef.current.click();
    }

    function handleFileSelection(e: ChangeEvent<HTMLInputElement>) {
        if (!e.target.files) return toast.error("No file selected");

        const file = e.target.files[0];


        console.log(file)

        const reader = new FileReader();

        reader.onloadend = () => {
            setPreviewImage(reader.result as string);
        }

        reader.readAsDataURL(file);


    }

    console.log(previewImage)

    async function CreatePost() {
        try {
            const token = localStorage.getItem("token");

            const res = await fetch("http://localhost:3000/api/posts/create",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        content: post
                    })
                })

            const data = await res.json();

            if (!data.success) {
                return toast.warning("Can not create post", {
                    description: data.message
                })
            }

            toast.success(data.message);
            onPostSuccess();

        } catch (err) {
            console.log(err)
            toast.error("Can not create post")
        }
    }


    return (
        <Dialog>
            <DialogTrigger className="w-full">
                <Card>
                    <CardHeader className="text-start">
                        <CardTitle>Post</CardTitle>
                        <CardDescription>
                            Post about what is on your mind!
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        <Input placeholder="Start writing your post" className="cursor-pointer" />
                    </CardContent>
                </Card>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        <div className="flex items-center gap-4">
                            <img src="https://placehold.co/50x50" alt="" className="rounded-full" />

                            <h1 className="uppercase">{user?.name}</h1>
                        </div>
                    </DialogTitle>
                </DialogHeader>

                {previewImage && <img src={previewImage} alt="preview-img" className="rounded-xl" />}



                <Textarea placeholder="Write your content here" onChange={(e) => setPost(e.target.value)} />

                <Input type="file" className="hidden" ref={fileSelectionRef} accept="image/*" onChange={handleFileSelection} />

                <div className="flex items-center gap-2">
                    <Button onClick={CreatePost}>Post</Button>
                    <Button variant={"ghost"} onClick={selectFile}>
                        <Upload />
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default PostDialog