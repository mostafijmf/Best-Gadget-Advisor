import { dbConnect } from "@/database/dbConnect";
import LeaveAReply from "@/database/models/LeaveAReply";
import { NextResponse } from "next/server";

dbConnect();

// <!-- Create leave a reply -->
export const POST = async (req) => {
    try {
        const body = await req.json();
        await LeaveAReply.create(body);
        return NextResponse.json({ success: 'Successfully submitted!' }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
};