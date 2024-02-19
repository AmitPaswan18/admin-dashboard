import { notFound, redirect } from "next/navigation";

async function authProvider() {
    "use server";
    const res = await fetch("http://localhost:3000/api/auth/signin", {
        cache: "no-cache",
    });

    if (!res.ok) {
        return notFound;
    }
    return res.json();
}

async function handleLogin(values: any) {
    "use server"
    const username = values.get("username").toString();
    const password = values.get("password").toString();

    try {
        const res = await fetch("http://localhost:3000/api/authlogin", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });

        if (!res.ok) {
            console.error("Authentication failed");
            return;
        }
    } catch (error) {
        console.error("Error during fetch:", error);
    }
    redirect("/");
}

export { authProvider, handleLogin };
