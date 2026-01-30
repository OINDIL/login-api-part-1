import { Input } from "../ui/input";
import { Label } from "../ui/label";

export default function Homepage() {
    return (
        <div className="p-10">

            <form action="" className="space-y-2">
                <Label>Upload an Image</Label>
                <Input type="file" onChange={(e) => console.log(e)} />
            </form>

        </div>
    )
}