import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { toast } from "sonner";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"
import { Link } from "react-router-dom";

export default function SignUp() {
    const [email, setEmail] = useState<string | null>(null);
    const [name, setName] = useState<string | null>(null);
    const [password, setPassword] = useState<string | null>(null);
    const [confirmPassword, setConfirmPassword] = useState<string | null>(null);
    const [phoneNumber, setPhoneNumber] = useState<string | null>(null);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!email || !password || !name || !confirmPassword || !phoneNumber) {
            return toast.error("All fields are required")
        }

        if (password && password?.length < 8) {
            return toast.error("Password must be of 8 chars")
        }

        if (confirmPassword && (confirmPassword !== password)) {
            return alert("Passwords do not match");
        }


        const res = await fetch("http://localhost:3000/api/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                name,
                phone: phoneNumber,
                password,
            })
        });

        const data = await res.json();

        if (!data.success) {
            return toast.error("Sign up failed", {
                description: data.message
            })
        }

        toast.success("Sign up successful")
        window.location.href = "/about";

    }
    return (
        <div className="p-10 max-w-md mx-auto border mt-20 rounded-xl shadow">
            <div className="mb-5">
                <h1 className="text-3xl">Sign up</h1>
                <p className="text-lg text-muted-foreground">Sign up for your new account.</p>
            </div>
            <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="space-y-2">
                    <Label htmlFor="user-name">Name</Label>
                    <Input name="user-name" id="user-name" placeholder="Enter your name" onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="user-email">Email</Label>
                    <Input name="user-email" id="user-email" placeholder="johndoe@example.com" type="email" onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="user-phone">Phone Number</Label>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Input name="user-phone" id="user-phone" placeholder="+91 ***********" onChange={(e) => setPhoneNumber(e.target.value)} />
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Phone number must be of 10 digits</p>
                        </TooltipContent>
                    </Tooltip>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="user-pass">Password</Label>
                    <Input name="user-pass" id="user-pass" placeholder="Min 8 characters" type="password" onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="user-pass-confirm">Confirm Password</Label>
                    <Input name="user-pass-confirm" id="user-pass-confirm" placeholder="Please re-enter your password" onChange={(e) => setConfirmPassword(e.target.value)} />
                </div>


                <div className="space-x-2">
                    <Button type="submit" className="cursor-pointer">Sign Up</Button>
                    <Link to={"/sign-in"}>Already have an Account?</Link>
                </div>
            </form>
        </div>
    )
}