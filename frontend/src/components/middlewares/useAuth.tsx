import { useEffect, useState } from "react";

export default function useAuth() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        async function checkAuth() {
            try {
                setIsLoading(true);
                let token = localStorage.getItem("token");
                const res = await fetch("http://localhost:3000/api/auth-check", {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                });

                const data = await res.json();

                if (!data.success) {
                    setIsAuthenticated(false)
                } else {
                    setIsAuthenticated(true);
                }


            } catch {
                setIsAuthenticated(false);
            } finally {
                setIsLoading(false);
            }
        }
        checkAuth();
    }, [])


    return { isAuthenticated, isLoading }
}