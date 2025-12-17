import useAuth from "../middlewares/useAuth"
import Error from "./Error";
import Loader from "./Loader";

function Profile() {

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
        <div>Profile</div>
    )
}

export default Profile