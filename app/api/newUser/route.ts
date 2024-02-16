import { NextResponse, NextRequest } from "next/server"
import connectDb from "@/db"
import authLogin from "@/models/login"
export async function POST(req: any, res :  any) {
    try {
        await connectDb()
        const data = await req.json()
        console.log(data);
        const post = new authLogin(data);
        await post.save();
        return NextResponse.json({ message: "Data saved successfully" })
    } catch (error) {
        return NextResponse.json({ message: "Failed to save the data" })
    }

} 