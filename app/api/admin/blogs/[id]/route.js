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

// <!-- Get Blog By Id -->
export const GET = async (req, { params }) => {
    try {
        // <!-- Checking user role for admin -->
        const userId = headers().get('userId');
        const isUser = await User.findById({ _id: userId });
        if (isUser.role !== 'admin') {
            return NextResponse.json({ error: "You are not allowed for this route!" }, { status: 403 })
        };

        const result = await Blog.findById({ _id: params.id });

        if (!result) return NextResponse.json({ error: "No result found!" }, { status: 404 });

        return NextResponse.json(result, { status: 200 });

    } catch (error) {
        if (error.name === 'CastError') return NextResponse.json({ error: "No result found!" }, { status: 404 });
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};


// <!-- Update Blog By Id -->
export const PATCH = async (req, { params }) => {
    try {
        // <!-- Checking user role for admin -->
        const userId = headers().get('userId');
        const isUser = await User.findById({ _id: userId });
        if (isUser.role !== 'admin') {
            return NextResponse.json({ error: "You are not allowed for this route!" }, { status: 403 })
        };

        // <!-- Creating a Blog -->
        const formData = await req.formData();
        const body = {};
        for (const [name, value] of formData.entries()) {
            body[name] = value;
        };

        let coverPhoto_src;
        if (typeof body.coverPhoto_src === 'object') {
            const bytesImage = await body.coverPhoto_src.arrayBuffer();
            const bufferImage = Buffer.from(bytesImage);
            const imagePath = `${convertStr(body.coverPhoto_alt)}_${Date.now()}.jpg`;
            // <!-- Resizing cover photo -->
            await sharp(bufferImage)
                .resize({ width: 1000 })
                .toFormat('jpg')
                .toFile(
                    resolve('./public/blogs/cover_photo', imagePath)
                );
            coverPhoto_src = `/blogs/cover_photo/${imagePath}`;

            const blog = await Blog.findById({ _id: params.id });
            if (blog.coverPhoto_src) {
                const imageName = await blog.coverPhoto_src.replace(/^\/blogs\/cover_photo\//, '');
                await fs.unlink(resolve('./public/blogs/cover_photo', imageName));
            }
        }
        else {
            coverPhoto_src = body.coverPhoto_src
        }

        const result = await Blog.findByIdAndUpdate({ _id: params.id }, {
            $set: {
                ...body,
                coverPhoto_src: coverPhoto_src,
                pathName: "/" + convertStr(body.pathName),
            }
        });

        if (result) {
            return NextResponse.json({ success: "Blog update successfully" }, { status: 200 });
        } else {
            return NextResponse.json({ error: "Something went wrong!" }, { status: 500 });
        }
    } catch (error) {
        if (error.name === 'CastError') return NextResponse.json({ error: "No result found!" }, { status: 404 });
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};


// <!-- Delete a blog by ID -->
export const DELETE = async (req, { params }) => {
    try {
        // <!-- Checking user role for admin -->
        const userId = headers().get('userId');
        const isUser = await User.findById({ _id: userId });
        if (isUser.role !== 'admin') {
            return NextResponse.json({ error: "You are not allowed for this route!" }, { status: 403 })
        };

        const blog = await Blog.findById({ _id: params.id });
        if (blog) {
            const imageName = await blog.coverPhoto_src.replace(/^\/blogs\/cover_photo\//, '');
            await fs.unlink(resolve('./public/blogs/cover_photo', imageName));
            await Blog.findByIdAndDelete({ _id: params.id });

            return NextResponse.json({ success: "Delete successful!" }, { status: 200 });
        }
        else {
            return NextResponse.json({ error: "Something went wrong!" }, { status: 404 })
        };

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}