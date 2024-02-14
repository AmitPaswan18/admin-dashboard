import { NextResponse, NextRequest } from "next/server"
import connectDb from "@/db"
import authLogin from "@/models/login"
export async function POST(req: any, res: any) {
    try {
        await connectDb()
        const data = await req.json()
        console.log(data);
        const post = new authLogin(data);
        console.log("this user is successfully reg.... ->>>>>>", post);
        await post.save();
        return NextResponse.json({ message: "Data saved successfully" })
    } catch (error) {
        return NextResponse.error("An error occurred while processing the request.")
    }

} 