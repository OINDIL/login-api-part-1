import { Label } from "@radix-ui/react-label";
import { useState } from "react";
import { toast } from "sonner";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
    const navigate = useNavigate();
    const [email, setEmail] = useState<string | null>(null);
    const [password, setPassword] = useState<string | null>(null);


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!email || !password) {
            return toast.error("All fields are required")
        }

        if (password && password?.length < 8) {
            return toast.error("Password must be of 8 chars")
        }




        const res = await fetch("http://localhost:3000/api/signin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password,
            })
        });

        const data = await res.json();

        if (!data.success) {
            return toast.error("Sign in failed", {
                description: data.message
            })
        }
        toast.success("Sign in successful")
        localStorage.setItem("token", data.token);

        navigate("/feed")

    }
    return (
        <div className="p-10 max-w-md mx-auto border mt-20 rounded-xl shadow">
            <div className="mb-5">
                <h1 className="text-3xl">Sign in</h1>
                <p className="text-lg text-muted-foreground">Sign in for accessing your account</p>
            </div>
            <form className="space-y-4" onSubmit={handleSubmit}>

                <div className="space-y-2">
                    <Label htmlFor="user-email">Email</Label>
                    <Input name="user-email" id="user-email" placeholder="johndoe@example.com" type="email" onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="user-pass">Password</Label>
                    <Input name="user-pass" id="user-pass" placeholder="Min 8 characters" type="password" onChange={(e) => setPassword(e.target.value)} />
                </div>


                <div className="space-x-2">
                    <Button type="submit" className="cursor-pointer">Sign In</Button>
                    <Link to={"/sign-up"}>Don't have an account?</Link>
                </div>
            </form>
        </div>
    )
}