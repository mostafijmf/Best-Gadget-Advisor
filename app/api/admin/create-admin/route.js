import { NextResponse } from "next/server";
import { headers } from "next/headers";
import bcrypt from "bcrypt";
import { dbConnect } from "@/database/dbConnect";
import User from "@/database/models/User";

dbConnect();

// <!-- Create a Sub-Admin -->
export async function POST(req) {
    try {
        // <!-- Checking user role for admin -->
        const userId = headers().get('userId');
        const isUser = await User.findById({ _id: userId });
        if (isUser.role !== 'admin') {
            return NextResponse.json({ error: "You are not allowed for this route!" }, { status: 403 })
        };

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


// <!-- Create an Admin -->
export async function PATCH(req) {
    try {
        // <!-- Checking user role for admin -->
        const userId = headers().get('userId');
        const isUser = await User.findById({ _id: userId });
        if (isUser.role !== 'admin') {
            return NextResponse.json({ error: "You are not allowed for this route!" }, { status: 403 })
        };

        const { userId: id, password, role } = await req.json();
        const isCorrectPass = await bcrypt.compare(password, isUser.password);
        if (!isCorrectPass) return NextResponse.json({ error: "Incorrect password!" }, { status: 401 });

        // <!-- Converting user role admin to sub-admin -->
        const isUpdate = await User.findByIdAndUpdate(
            { _id: userId },
            {
                $set: {
                    role: 'sub-admin'
                }
            }
        );

        // <!-- Converting user role sub-admin to admin -->
        if (isUpdate) {
            const result = await User.findByIdAndUpdate(
                { _id: id },
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