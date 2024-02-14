
import connectDb from "@/db";// import authLogin from "@/models/login";
import UserData from "@/models/register";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req : any, res : any) {
    try {
        await connectDb();
        const data = await req.json()
        const { username, password } = data;
        console.log(username, password);
        const user = await UserData.findOne({ username, password });
        console.log(user);
        if (user) {
            return new NextResponse(JSON.stringify(user), { status: 200 });
        } else {
            return new NextResponse( "Invalid credentials", { status: 401 });
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        return new NextResponse( error.message , { status: 500 });
    }
}
