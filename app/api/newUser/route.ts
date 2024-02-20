import { NextResponse, NextRequest } from "next/server"
import connectDb from "@/app/_lib/db"
import authLogin from "../../models/login"
export async function POST(req: any, res: any) {
    try {
        await connectDb()
        const data = await req.json()
        // console.log(data);
        // const post = new authLogin(data);
        // await post.save();
        // return NextResponse.json({ message: "Data saved successfully" })
        const collection = authLogin.db.collection(authLogin.collection.name);
        const result = await collection.insertOne(data);
        if (result.acknowledged) {
            return NextResponse.json(data);
        } else {
            throw new Error("Failed to insert document");
        }
    } catch (error: any) {
        return NextResponse.json({ message: "Failed to save the data" }, error.message)
    }

} 