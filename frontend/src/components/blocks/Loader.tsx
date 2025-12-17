import { Loader2Icon } from 'lucide-react'

function Loader() {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <Loader2Icon className="animate-spin" />
        </div>
    )
}

export default Loader