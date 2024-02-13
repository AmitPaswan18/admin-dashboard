import connectDb from "@/db";
import UserData from "@/models/register";
import { redirect } from 'next/navigation';
import { revalidatePath } from "next/cache";



export default async function handleSubmit(values: any) {
    const username = values.get("username").toString();
    const password = values.get("password").toString();

    await connectDb();

    const validateUser = await UserData.findOne({
        username: username,
        password: password,
    });

    if (validateUser) {
        redirect("/users");
    }

    revalidatePath("/posts");
}

