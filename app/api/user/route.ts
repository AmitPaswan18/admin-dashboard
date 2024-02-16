import connectDb from "@/db";
import UserData from "@/models/register";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { revalidatePath } from 'next/cache'

export async function DELETE(req: any) {
    try {
        await connectDb();
        const body = await req.json();
        const { deleteid } = body;
        const id = new mongoose.Types.ObjectId(deleteid);
        const user = await UserData.findByIdAndDelete(id);
        if (!user) {
            return new NextResponse("User not found", { status: 404 });
        }
        revalidatePath('/users')
        return new NextResponse("User deleted successfully", { status: 200 })

    } catch (error) {
        console.error("Error deleting user:", error);
        return new NextResponse("Error in deleting the user", { status: 500 });
    }
}
export async function PUT(req: any,) {
    try {
        await connectDb();
        const body = await req.json();
        const { updateid, values } = body;
        const id = new mongoose.Types.ObjectId(updateid);
        const user = await UserData.findByIdAndUpdate(id, values, { new: true });
        if (!user) {
            return new NextResponse("User not found", { status: 404 });
        }
        revalidatePath('/')
        return new NextResponse("User Upated successfully", { status: 200 })

    } catch (error) {
        console.error("Error updating user:", error);
        return new NextResponse("Error in Updating the user", { status: 500 });
    }
}
