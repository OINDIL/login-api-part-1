import { useState } from "react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { toast } from "sonner"

function VerifyEmail() {


    const [email, setEmail] = useState<null | string>(null);
    const [otp, setOtp] = useState<null | string>(null);


    async function handleAccoutVerification(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!email || !otp) return toast.error("Email and OTP not found");

        const res = await fetch("http://localhost:3000/api/verify-email", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify({ email, otp })
        });

        const data = await res.json()

        if (!data.success) return toast.error(data.message);

        toast.success(data.message);


    }

    return (
        <div className="max-w-xl mx-auto p-5">

            <div className="mb-4">
                <h1 className="text-3xl">Account Verification</h1>
                <p className="text-muted-foreground">Verify your account for further access.</p>
            </div>
            <form className="space-y-3" onSubmit={handleAccoutVerification}>

                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input type="email" id="email" name="email" onChange={(e) => setEmail(e.target.value)} />
                </div>


                <div className="space-y-2">
                    <Label htmlFor="otp">Enter your OTP</Label>
                    <InputOTP maxLength={6} name="otp" id="otp" onChange={(e) => setOtp(e)}>
                        <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                            <InputOTPSlot index={3} />
                        </InputOTPGroup>
                    </InputOTP>
                </div>


                <Button>Verify Account</Button>


            </form>

        </div >
    )
}

export default VerifyEmail