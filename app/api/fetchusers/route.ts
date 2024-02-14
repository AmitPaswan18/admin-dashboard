import connectDb from "@/db";
import { NextResponse } from "next/server";
import UserData from "@/models/register";
// import authLogin from "@/models/login";
export async function GET(response) {
    try {
        await connectDb();
        const userDetails = await UserData.find();
        return new NextResponse(JSON.stringify(userDetails), { status: 200 });
    } catch (error) {
        console.error("Error fetching data:", error);
        return new NextResponse({ error: "Failed to fetch data" });
    }
}