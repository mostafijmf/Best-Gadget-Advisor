import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { dbConnect } from "@/database/dbConnect";
import User from "@/database/models/User";

dbConnect();

// <!-- Activate User Account -->
export async function PUT(req) {
    try {
        const { name, email, password, role, status } = await req.json();
        const existEmail = await User.findOne({ email });
        if (existEmail) return NextResponse.json({ error: "This email already exist!" }, { status: 406 });

        const passwordHash = await bcrypt.hash(password, 12);

        const user = {
            name,
            email,
            password: passwordHash,
            role,
            status,
        };
        const res = await User.create(user);
        if (res) return NextResponse.json({ success: `Your account created successfully!` }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};