import { dbConnect } from "@/database/dbConnect";
import Blog from "@/database/models/Blog";
import { NextResponse } from "next/server";

dbConnect();

// <!-- Get All Blogs -->
export const GET = async (req) => {
    try {
        const query = await req.nextUrl.searchParams.get("query");
        const page = await req.nextUrl.searchParams.get('page');
        const size = await req.nextUrl.searchParams.get('size');
        // <!-- Get all Blogs with skip and limit -->
        const skip = (page - 1) * parseInt(size);
        const limit = parseInt(size);

        // <!-- Get sorted Blogs with Aggregation Pipeline -->
        let aggregationPipeline = [
            { $match: { status: 'active' } },
            { $skip: skip },
            { $limit: limit }
        ];
        if (query === 'latest') aggregationPipeline.splice(1, 0, { $sort: { createdAt: -1 } });
        if (query === 'popular') aggregationPipeline.splice(1, 0, { $sort: { views: -1 } });

        const blogs = await Blog.aggregate(aggregationPipeline);
        const blogLength = await Blog.countDocuments();
        const totalPage = Math.ceil(blogLength / size);

        return NextResponse.json({ blogs, totalPage }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
};