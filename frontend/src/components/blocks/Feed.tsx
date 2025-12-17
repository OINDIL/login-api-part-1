
import useAuth from "@/components/middlewares/useAuth"
import Loader from "./Loader";
import Error from "./Error";
export default function Feed() {

    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        return (
            <Loader />
        )
    }

    if (!isAuthenticated) {
        return <Error />
    }


    return (
        <div>Hello this is the feed</div>
    )
}