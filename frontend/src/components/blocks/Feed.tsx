
import useAuth from "@/components/middlewares/useAuth"
import Loader from "./Loader";
import Error from "./Error";
import useProfile from "../hooks/useProfile";
import PostDialog from "../ui/PostDialog";

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
            <PostDialog user={profileData!} />
        </section>
    )
}