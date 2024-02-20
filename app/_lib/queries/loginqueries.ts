import { notFound } from "next/navigation";
async function authProvider() {
    const res = await fetch("http://localhost:3000/api/auth/signin", {
        cache: "no-cache",
    });

    if (!res.ok) {
        return notFound;
    }
    return res.json();
}
export { authProvider };
