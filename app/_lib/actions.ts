"use server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { User } from "../components/columns";
export async function createUser(
    prevState: {
        message: string;
    },
    formData: FormData,
) {
    const schema = z.object({
        username: z.string({
            required_error: "Please enter your full name",
        }),
        email: z.string().email("Please enter a valid email"),
        fathername: z.string({
            required_error: "Please enter your father name",
        }),
        jobtitle: z.string({
            required_error: "Please enter your Job title",
        }),
    });
    const parse = schema.safeParse({
        username: formData.get("username"),
        email: formData.get("email"),
        fathername: formData.get("fathername"),
        jobtitle: formData.get("jobtitle"),
    });
    if (!parse.success) {
        return { message: "Failed to create User" };
    }
    try {
        const data = parse.data;
        const res = await fetch(
            "http://localhost:3000/api/createuser",
            {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "content-type": "application/json",
                },
            }
        );

        if (res.ok) {
            revalidatePath("/");
            console.log("Registration successfully");
        } else {
            console.log("Oops! Something is wrong.");
        }
        return { message: `Added User ${data}` };
    } catch (e) {
        return { message: "Failed Registration" };
    }
}
export async function signUp(
    prevState: {
        message: string;
    },
    formData: FormData,
) {
    const schema = z.object({
        username: z.string({
            required_error: "Please enter your username",
        }),
        password: z.string({
            required_error: "Please enter your password",
        }),
        role: z.string()
    });
    const parse = schema.safeParse({
        username: formData.get("username"),
        password: formData.get("password"),
        role: formData.get("role"),
    });

    if (!parse.success) {
        return { message: "Failed to create User" };
    }
    try {
        const data = parse.data;
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const storeData = {
            username: data.username,
            password: hashedPassword,
            role: data.role
        }
        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/newUser`, {
            method: "POST",
            body: JSON.stringify(storeData),
            headers: {
                "content-type": "application/json",
            },
        });
        if (!res.ok) {
            console.log("Oops! Something is wrong.");
        }
        revalidatePath("/");
        return { message: `SignUp User ${data}` };
    } catch (error) {
        console.log(error);
        return { message: "Error during fetch" };
    }
}
export async function signIn(
    prevState: {
        message: string;
    },
    formData: FormData,
) {
    const schema = z.object({
        username: z.string({
            required_error: "Please enter your username",
        }),
        password: z.string({
            required_error: "Please enter your password",
        })
    });
    const parse = schema.safeParse({
        username: formData.get("username"),
        password: formData.get("password"),
    });
    if (!parse.success) {
        return { message: "Failed to login the User" };
    }
    try {
        const data = parse.data;
        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/authlogin`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username: data.username, password: data.password }),
        });

        if (!res.ok) {
            console.error("Authentication failed");
            return { message: "Authentication failed" };
        }
        return { message: `Signin User ${data}` };
    } catch (error) {
        console.error("Error during fetch:", error);
        return { message: "Error during fetch" };
    }
}

export async function getUsers(): Promise<User[]> {
    try {
        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/fetchusers`, {
            cache: "no-store",
        });
        const data = await res.json();
        return data;
    } catch (error: any) {
        console.error("Error fetching users:", error);
        return error.message;
    }
}

