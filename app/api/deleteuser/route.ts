import connectDb from "@/db";
import UserData from "@/models/register";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from 'next/cache'

export async function DELETE(req : any, res :  any) {
    try {
        await connectDb();
        const body = await req.json();
        const { deleteid } = body;
        const id = new mongoose.Types.ObjectId(deleteid);
        const user = await UserData.findByIdAndDelete(id);
        if (!user) {
            return new NextResponse("User not found", { status: 404 });
        }
        return new NextResponse("User deleted successfully", { status: 200 });
        revalidatePath("/users");

    } catch (error) {
        console.error("Error deleting user:", error);
        return new NextResponse("Error in deleting the user", { status: 500 });
    }
}
