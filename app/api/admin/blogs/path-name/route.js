import { dbConnect } from "@/database/dbConnect";
import Blog from "@/database/models/Blog";
import { NextResponse } from "next/server";

dbConnect();

export const GET = async (req) => {
    try {
        const query = req.nextUrl.searchParams.get("query");
        const pathName = "/" + query.trim().toLowerCase().replace(/\s+/g, '-').replace(/^\//, '');

        const res = await Blog.findOne({ pathName });

        if (!res) {
            return NextResponse.json({
                unique: true,
                success: `This path is available : '${pathName}'`
            },
                { status: 200 }
            );
        }

        return NextResponse.json({
            unique: false,
            error: `This Path '${pathName}' already exists.`
        },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};