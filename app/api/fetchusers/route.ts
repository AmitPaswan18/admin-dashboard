import connectDb from "@/app/_lib/db";
import { NextResponse } from "next/server";
import UserData from "../../models/register";
import { type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
    try {
        await connectDb();

        const searchParams = request.nextUrl.searchParams

        let page = 1
        let limit = 10

        const getpage = searchParams.get('page')
        const getlimit = searchParams.get('limit')

        if (getpage !== null) {
            page = parseInt(getpage)
        }

        if (getlimit !== null) {
            page = parseInt(getlimit)
        }
        const skip = (page - 1) * limit;
        // const userDetails = await UserData.find().skip(skip).limit(limit);
        const userDetails = await UserData.find()



        return new NextResponse(JSON.stringify(userDetails), { status: 200 });
    } catch (error) {
        console.error("Error fetching data:", error);
        return new NextResponse("Failed to fetch user data");
    }
}
