import { dbConnect } from "@/database/dbConnect";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import User from "@/database/models/User";

dbConnect();

// <!-- Get all users -->
export async function GET() {
    try {
        // <!-- Checking user role for admin -->
        const userId = headers().get('userId');
        const isUser = await User.findById({ _id: userId });
        if (isUser.role !== 'admin') {
            return NextResponse.json({ error: "You are not allowed for this route!" }, { status: 403 })
        };

        // <!-- Finding all users -->
        const users = await User.find({});
        return NextResponse.json({ payload: users });

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};


// <!-- Delete a user -->
export async function DELETE(req) {
    try {
        // <!-- Checking user role for admin -->
        const userId = headers().get('userId');
        const isUser = await User.findById({ _id: userId });
        if (isUser.role !== 'admin') {
            return NextResponse.json({ error: "You are not allowed for this route!" }, { status: 403 })
        };

        const { userId: id } = await req.json();

        // <!-- Admin can't be deleted! -->
        const isAdmin = await User.findById({ _id: id });
        if (isAdmin.role === 'admin') {
            return NextResponse.json({ error: "Admin can't be deleted!" }, { status: 403 })
        };

        // <!-- Delete a user -->
        await User.findByIdAndDelete({ _id: id });

        return NextResponse.json({ success: "Delete successful!" }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}