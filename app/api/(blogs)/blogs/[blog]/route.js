import { NextResponse } from "next/server";
import Blog from "@/database/models/Blog";
import { dbConnect } from "@/database/dbConnect";

dbConnect();

export const GET = async (req, { params }) => {
    try {
        const pathName = `/${params.blog}`;
        const blog = await Blog.findOne({ pathName });

        if (!blog) return NextResponse.json(
            { error: `Result not found with this path: "${pathName}"` },
            { status: 404 }
        );

        // Increment the view count
        blog.views += 1;
        await Blog.updateOne({ _id: blog._id }, { $set: { views: blog.views } });

        return NextResponse.json(blog, { status: 200 });

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};