import { Bug } from "lucide-react"
import { Link } from "react-router-dom"


function Error() {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="flex gap-4 text-red-400">
                <Bug />
                <p className="font-bold">
                    User is not authneticated. Please <Link to={"/sign-in"} className="underline cursor-pointer">Log in</Link></p>
            </div>
        </div>
    )
}

export default Error