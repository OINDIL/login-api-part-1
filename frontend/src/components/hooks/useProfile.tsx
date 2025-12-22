import { useEffect, useState } from "react"

interface profileDataType {
    name: string,
    email: string,
    phoneNo: string
}

function useProfile() {

    const [profileData, setProfileData] = useState<profileDataType | null>(null);

    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        async function checkAuth() {
            try {
                setIsLoading(true);
                let token = localStorage.getItem("token");
                const res = await fetch("http://localhost:3000/api/get-profile", {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                });

                const data = await res.json();

                if (data.success) {
                    setProfileData(data.user);
                } else {
                    setProfileData(null);
                }


            } catch {
                setProfileData(null);
            } finally {
                setIsLoading(false);
            }
        }
        checkAuth();
    }, [])


    return { profileData, isLoading }
}

export default useProfile