import connectDb from "@/db";
import UserData from "@/models/register";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: any, res: any) {
    try {
        await connectDb();
        const data = await req.json()
        const { username, password } = data;
        const user = await UserData.findOne({ username });
        if (!user) {
            return new NextResponse("User not found", { status: 404 });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return new NextResponse("Invalid credentials", { status: 401 });
        }

        return new NextResponse(JSON.stringify(user), { status: 200 });
    } catch (error) {
        console.error("Error fetching data:", error);
        return new NextResponse("There is some error: ", { status: 500 });
    }
}
