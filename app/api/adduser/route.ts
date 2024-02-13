import { NextResponse, NextRequest } from "next/server"
import UserData from "@/models/register"
import connectDb from "@/db"


export async function POST(req: any, res: any) {
    await connectDb()
    const data = await req.json()
    console.log(data);
    const post = new UserData(data);
    console.log("this is going on database ->>>>>>", post);
    await post.save();
    return NextResponse.json(data)

}