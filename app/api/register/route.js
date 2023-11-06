import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";
//to hash the password
import bcrypt from "bcryptjs";

export async function POST(req) {
    try {
        const { email, password } = await req.json();
        const hashedPassword = await bcrypt.hash(password, 10);

        //Now we will connect the this code with our db.
        await connectMongoDB();
        await User.create({email, password: hashedPassword});

        return NextResponse.json({ message: "User registered. "}, {status: 201});
    }
    catch (error) {
        return NextResponse.json({ message: "An error occured while registering the user."}, { status:500 });
    }
}