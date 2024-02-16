import { NextResponse } from "next/server"
import UserData from "@/models/register"
import connectDb from "@/db"


export async function POST(req: any, res: any) {
    await connectDb()
    try {
        const data = await req.json()
        const post = new UserData(data);
        await post.save();
        return NextResponse.json(data)
    } catch (error) {
        return { message: 'Failed to Add new User..' };
    }

}