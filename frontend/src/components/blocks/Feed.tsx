
import useAuth from "@/components/middlewares/useAuth"
import Loader from "./Loader";
import Error from "./Error";
import useProfile from "../hooks/useProfile";
import PostDialog from "../ui/PostDialog";
import useGetPosts from "../hooks/useGetPosts";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";
import { MessageCircleIcon, Share, ThumbsUp } from "lucide-react";

export default function Feed() {

    const { isAuthenticated, isLoading } = useAuth();
    const { profileData, isLoading: isProfileLoading } = useProfile();
    const { postData, isLoading: isPostsLoading, GetPostData } = useGetPosts();


    if (isLoading || isProfileLoading || isPostsLoading) {
        return (
            <Loader />
        )
    }

    if (!isAuthenticated) {
        return <Error />
    }


    return (
        <section className="max-w-4xl mx-auto py-10 px-5">
            <PostDialog user={profileData!} onPostSuccess={GetPostData} />

            <Separator className="my-10" />

            <main>
                <h1 className="text-2xl mb-3">All Posts</h1>
                {/* Below all the posts will be listed */}
                <div className="space-y-3">
                    {postData?.map((data, index) => (
                        <Card key={index}>
                            <CardHeader>
                                <CardTitle className="capitalize">{data.userName}</CardTitle>
                                <CardDescription>{data.dateTime}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-base text-neutral-300">{data.content}</p>
                            </CardContent>

                            <CardFooter className="space-x-4 *:size-4 *:hover:cursor-pointer *:hover:scale-[115%]">
                                <ThumbsUp fill="white" />
                                <MessageCircleIcon />
                                <Share />
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </main>
        </section>
    )
}