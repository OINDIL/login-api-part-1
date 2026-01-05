
import useAuth from "@/components/middlewares/useAuth"
import Loader from "./Loader";
import Error from "./Error";
import useProfile from "../hooks/useProfile";
import PostDialog from "../ui/PostDialog";
import useGetPosts from "../hooks/useGetPosts";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";

export default function Feed() {

    const { isAuthenticated, isLoading } = useAuth();
    const { profileData, isLoading: isProfileLoading } = useProfile();
    const { postData, isLoading: isPostsLoading } = useGetPosts();

    console.log(postData)


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
            <PostDialog user={profileData!} />


            <Separator className="my-10" />

            <main>
                <h1 className="text-2xl mb-3">All Posts</h1>
                {/* Below all the posts will be listed */}
                <div className="space-y-3">
                    {postData?.map((data, index) => (
                        <Card key={index}>
                            <CardHeader>
                                <CardTitle className="capitalize">{data.userName}</CardTitle>
                                <CardDescription>{data.content}</CardDescription>
                            </CardHeader>
                        </Card>
                    ))}
                </div>
            </main>
        </section>
    )
}