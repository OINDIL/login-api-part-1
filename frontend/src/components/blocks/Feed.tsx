
import useAuth from "@/components/middlewares/useAuth"

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import Loader from "./Loader";
import Error from "./Error";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import useProfile from "../hooks/useProfile";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
export default function Feed() {

    const { isAuthenticated, isLoading } = useAuth();
    const { profileData, isLoading: isProfileLoading } = useProfile()


    if (isLoading || isProfileLoading) {
        return (
            <Loader />
        )
    }

    if (!isAuthenticated) {
        return <Error />
    }


    return (
        <section className="max-w-4xl mx-auto py-10 px-5">
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

                                <h1 className="uppercase">{profileData?.name}</h1>
                            </div>
                        </DialogTitle>
                    </DialogHeader>
                    <Textarea placeholder="Write your content here" />

                    <Button>Post</Button>
                </DialogContent>
            </Dialog>
        </section>
    )
}