import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { SignJWT } from "jose";
import bcrypt from "bcrypt";
import { dbConnect } from "@/database/dbConnect";
import User from "@/database/models/User";
import { activateEmail } from "@/libs/emailSender";


dbConnect();

// <!-- Get all users -->
export async function GET() {
    try {
        // <!-- Checking user role for admin -->
        const { role } = JSON.parse(headers().get('userInfo'));
        if (role !== 'admin') {
            return NextResponse.json({ error: "You are not allowed for this route!" }, { status: 403 })
        };

        // <!-- Finding all users -->
        const users = await User.find({});
        return NextResponse.json({ payload: users });

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};

// <!-- Create a Sub-Admin -->
export async function POST(req) {
    try {
        // <!-- Checking user role for admin -->
        const { role } = JSON.parse(headers().get('userInfo'));
        if (role !== 'admin') {
            return NextResponse.json({ error: "You are not allowed for this route!" }, { status: 403 })
        };

        const body = await req.json();
        if (!body.email) return NextResponse.json({ error: "Email address is required!" }, { status: 403 });
        if (!body.role) return NextResponse.json({ error: "User Role is required!" }, { status: 403 });

        const existEmail = await User.findOne({ email: body.email });
        if (existEmail) return NextResponse.json({ error: "This email already exist!" }, { status: 406 });

        const token = await new SignJWT(body)
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt()
            .setExpirationTime('1d')
            .sign(new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_ACCESS_TOKEN));

        activateEmail({
            email: body.email,
            link: `${process.env.NEXT_PUBLIC_BASE_URL}/active-link?token=${token}`,
            base_url: process.env.NEXT_PUBLIC_BASE_URL
        });

        return NextResponse.json({ success: `Request sent to ${body.email} successfully` }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};

// <!-- Update account -->
export async function PATCH(req) {
    try {
        // <!-- Checking user role for admin -->
        const { id } = JSON.parse(headers().get('userInfo'));
        const isUser = await User.findById({ _id: id });
        if (isUser.role !== 'admin') {
            return NextResponse.json({ error: "You are not allowed for this route!" }, { status: 403 })
        };

        const { userId, password, role } = await req.json();
        const isCorrectPass = await bcrypt.compare(password, isUser.password);
        if (!isCorrectPass) return NextResponse.json({ error: "Incorrect password!" }, { status: 401 });

        // <!-- Converting user role admin to sub-admin -->
        const isUpdate = await User.findByIdAndUpdate(
            { _id: id },
            {
                $set: {
                    role: 'sub-admin'
                }
            }
        );

        // <!-- Converting user role sub-admin to admin -->
        if (isUpdate) {
            const result = await User.findByIdAndUpdate(
                { _id: userId },
                {
                    $set: {
                        role: role
                    }
                }
            );
            return NextResponse.json(
                { success: "Admin is created successfully!", payload: result },
                { status: 200 }
            );
        }
        else {
            return NextResponse.json({ error: "Something went wrong!" }, { status: 500 });
        }

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}