
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
import { useState } from "react";
import { toast } from "sonner";


interface Props {
    user: {
        name: string,
        phoneNo: string,
        email: string
    },
    onPostSuccess: () => void
}

function PostDialog({ user, onPostSuccess }: Props) {

    const [post, setPost] = useState<string | null>(null);


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
                <Textarea placeholder="Write your content here" onChange={(e) => setPost(e.target.value)} />

                <Button onClick={CreatePost}>Post</Button>
            </DialogContent>
        </Dialog>
    )
}

export default PostDialog