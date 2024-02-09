
import { NextResponse } from "next/server";
import UserData from "@/models/register";

import mongoose from "mongoose";
export async function GET() {
    await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.ymnt0q4.mongodb.net/dummydata`)

    const data = await UserData.find()

    return NextResponse.json({ result: data })
}