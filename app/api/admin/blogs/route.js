import { NextResponse } from "next/server";
import { headers } from "next/headers";
import sharp from "sharp";
import fs from "fs/promises";
import { resolve } from 'path';
import Blog from "@/database/models/Blog";
import User from "@/database/models/User";
import { dbConnect } from "@/database/dbConnect";
import convertStr from "@/libs/convertStr";

dbConnect();


// <!-- Creating a Blog -->
export const POST = async (req) => {
    try {
        // <!-- Checking user role for admin -->
        const userId = headers().get('userId');
        const isUser = await User.findById({ _id: userId });
        if (isUser.role !== ('admin' || 'sub-admin')) {
            return NextResponse.json({ error: "You are not allowed for this route!" }, { status: 403 })
        };

        // <!-- Creating a Blog -->
        const formData = await req.formData();
        const body = {};
        for (const [name, value] of formData.entries()) {
            body[name] = value;
        };

        const bytesImage = await body.coverPhoto_src.arrayBuffer();
        const bufferImage = Buffer.from(bytesImage);
        const imagePath = `${convertStr(body.coverPhoto_alt)}_${Date.now()}.jpeg`;
        // <!-- Resizing cover photo -->
        await sharp(bufferImage)
            .resize({ width: 1000 })
            .flatten({ background: 'white' })
            .toFormat('jpeg')
            .toFile(
                resolve('./public/blogs/cover_photo', imagePath)
            );

        const data = {
            ...body,
            coverPhoto_src: `/blogs/cover_photo/${imagePath}`,
            pathName: "/" + convertStr(body.pathName),
        };

        try {
            await Blog.create(data);
            return NextResponse.json({ success: "Blog is created successfully!" }, { status: 200 })
        }
        catch (error) {
            fs.unlink(resolve('./public/blogs/cover_photo', imagePath));
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
};


// <!-- Get All Blogs -->
export const GET = async () => {
    try {
        // <!-- Checking user role for admin -->
        const userId = headers().get('userId');
        const isUser = await User.findById({ _id: userId });
        if (isUser.role !== ('admin' || 'sub-admin')) {
            return NextResponse.json({ error: "You are not allowed for this route!" }, { status: 403 })
        };

        const blogs = await Blog.find({}).sort({ createdAt: -1 });

        return NextResponse.json(blogs, { status: 200 });

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
};


// <!-- Update Blog Status -->
export const PATCH = async (req) => {
    try {
        // <!-- Checking user role for admin -->
        const userId = headers().get('userId');
        const isUser = await User.findById({ _id: userId });
        if (isUser.role !== ('admin' || 'sub-admin')) {
            return NextResponse.json({ error: "You are not allowed for this route!" }, { status: 403 })
        };

        const { id, status } = await req.json();
        const result = await Blog.findByIdAndUpdate({ _id: id }, {
            $set: {
                status: status.toLowerCase(),
            }
        });
        return NextResponse.json(result, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
};
