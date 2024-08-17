import { NextResponse } from "next/server";
import { headers } from "next/headers";
import Blog from "@/database/models/Blog";
import { dbConnect } from "@/database/dbConnect";
import convertStr from "@/libs/convertStr";
import cloudinary from "@/libs/cloudinary.config";

dbConnect();

// <!-- Creating a Blog -->
export const POST = async (req) => {
    try {
        // <!-- Checking user role for admin -->
        const { id, role } = JSON.parse(headers().get("userInfo"));
        if (!["admin", "sub-admin"].includes(role)) {
            return NextResponse.json({ error: "You are not allowed for this route!" }, { status: 403 });
        }

        // <!-- Creating a Blog -->
        const formData = await req.formData();
        const body = {};
        for (const [name, value] of formData.entries()) {
            body[name] = value;
        }

        const bytesImage = await body.coverPhoto_src.arrayBuffer();
        const bytes = Buffer.from(bytesImage);
        // Upload to Cloudinary
        const uploadResult = await new Promise((resolve, reject) => {
            cloudinary.uploader
                .upload_stream({ folder: "Review-Holder/blogs/cover_photo" }, (error, result) => {
                    if (error) {
                        reject(error);
                        return;
                    }
                    resolve(result);
                })
                .end(bytes);
        });

        const data = {
            ...body,
            author: id,
            coverPhoto_src: uploadResult.secure_url,
            pathName: "/" + convertStr(body.pathName),
        };

        await Blog.create(data);
        return NextResponse.json({ success: "Blog is created successfully!" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};

// <!-- Get All Blogs -->
export const GET = async () => {
    try {
        // <!-- Checking user role for admin -->
        const { role } = JSON.parse(headers().get("userInfo"));
        if (!["admin", "sub-admin"].includes(role)) {
            return NextResponse.json({ error: "You are not allowed for this route!" }, { status: 403 });
        }

        const blogs = await Blog.find({}).sort({ createdAt: -1 });

        return NextResponse.json(blogs, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};

// <!-- Update Blog Status -->
export const PATCH = async (req) => {
    try {
        // <!-- Checking user role for admin -->
        const { role } = JSON.parse(headers().get("userInfo"));
        if (!["admin", "sub-admin"].includes(role)) {
            return NextResponse.json({ error: "You are not allowed for this route!" }, { status: 403 });
        }

        const { id: blogId, status } = await req.json();
        const result = await Blog.findByIdAndUpdate(
            { _id: blogId },
            {
                $set: {
                    status: status.toLowerCase(),
                },
            }
        );
        return NextResponse.json(result, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};
