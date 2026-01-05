import { useEffect, useState } from "react"


interface PostType {
    userName: string,
    content: string,
}

function useGetPosts() {

    const [postData, setPostData] = useState<PostType[] | null>(null)
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function GetPostData() {
            try {
                setIsLoading(true);
                let token = localStorage.getItem("token");
                const res = await fetch("http://localhost:3000/api/posts/all", {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                });

                const data = await res.json();

                if (data.success) {
                    setPostData(data.posts);
                } else {
                    setPostData(null);
                }


            } catch {
                setPostData(null);
            } finally {
                setIsLoading(false);
            }
        }
        GetPostData();
    }, [])


    return { postData, isLoading }
}

export default useGetPosts