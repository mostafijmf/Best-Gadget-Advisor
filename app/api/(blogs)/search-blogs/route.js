import { NextResponse } from "next/server";
import { dbConnect } from "@/database/dbConnect";
import Blog from "@/database/models/Blog";

dbConnect();

export const GET = async (req) => {
    try {
        const query = await req.nextUrl.searchParams.get("query");
        const res = await Blog.find({ title: { $regex: query, $options: 'i' } });

        if (res.length !== 0) {
            return NextResponse.json({ blogs: res, noResult: false }, { status: 200 });
        }
        else {
            return NextResponse.json({ blogs: res, noResult: true }, { status: 200 });
        };

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}