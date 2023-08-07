import { NextResponse } from "next/server";
import { headers } from "next/headers";
import bcrypt from "bcrypt";
import { dbConnect } from "@/database/dbConnect";
import User from "@/database/models/User";

dbConnect();

export async function POST(req) {
    try {
        const userId = headers().get('userId');
        const isUser = await User.findById({ _id: userId });
        if (isUser.role !== 'admin') return NextResponse.json(
            { error: "You are not allowed for this route!" },
            { status: 403 }
        );

        const { name, email, password, role } = await req.json();

        const existEmail = await User.findOne({ email });
        if (existEmail) return NextResponse.json({ error: "This email already exist!" }, { status: 406 });

        const passwordHash = await bcrypt.hash(password, 12);

        const user = {
            name,
            email,
            password: passwordHash,
            role,
        };
        await User.create(user);

        return NextResponse.json({ success: "Successfully created!" }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};