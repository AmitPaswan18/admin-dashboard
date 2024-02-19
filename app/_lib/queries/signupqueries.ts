import { redirect } from 'next/navigation';
import connectDb from "@/db";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";
async function handleSignUp(formData: FormData) {
    "use server";
    await connectDb();
    try {
        const username = formData.get("username") as string;
        const password = formData.get("password") as string;
        const hashedPassword = await bcrypt.hash(password, 10);

        const data = {
            username,
            password: hashedPassword,
        };

        console.log(data);
        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/newUser`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "content-type": "application/json",
            },
        });
        if (res.ok) {
            console.log("Signup User Success");
            return redirect('/');
        } else {
            console.log("Oops! Something is wrong.");
        }
    } catch (error) {
        console.log(error);
    }

    revalidatePath("/posts");
}

export default handleSignUp;


