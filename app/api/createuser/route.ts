import { NextResponse } from "next/server";
import UserData from "../../models/register";
import connectDb from "@/app/_lib/db";

export async function POST(req: any, res: any) {
    await connectDb();

    try {
        const data = await req.json();
        const collection = UserData.db.collection(UserData.collection.name);
        const result = await collection.insertOne(data);
        if (result.acknowledged) {
            return NextResponse.json(data);
        } else {
            throw new Error("Failed to insert document");
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Failed to add new user.", error }, { status: 500 });
    }
}

