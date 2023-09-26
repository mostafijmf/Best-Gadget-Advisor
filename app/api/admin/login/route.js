import bcrypt from "bcrypt";
import { SignJWT } from "jose";
import { NextResponse } from "next/server";
import User from "@/database/models/User";
import { dbConnect } from "@/database/dbConnect";

dbConnect();

export async function POST(req) {
    try {
        const { email, password } = await req.json();

        const user = await User.findOne({ email });
        if (!user) return NextResponse.json({ error: "This email does not exist!" }, { status: 404 });

        const isCorrectPass = await bcrypt.compare(password, user.password);
        if (!isCorrectPass) return NextResponse.json({ error: "Incorrect password!" }, { status: 401 });
        if (user.status !== 'active') return NextResponse.json({ error: "" }, { status: 403 });

        const token = await new SignJWT({ id: user._id, role: user.role })
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt()
            .setExpirationTime('1d')
            .sign(new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_ACCESS_TOKEN));

        const response = NextResponse.json({ success: "Login successful!" }, { status: 200 });

        response.cookies.set("accessToken", token, {
            httpOnly: true,

        })
        return response;

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
};