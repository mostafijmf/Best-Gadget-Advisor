import { NextResponse } from "next/server";
import { headers } from "next/headers";
import fs from "fs/promises";
import { resolve } from "path";
import Blog from "@/database/models/Blog";
import { dbConnect } from "@/database/dbConnect";
import convertStr from "@/libs/convertStr";
import cloudinary from "@/libs/cloudinary.config";

dbConnect();

// <!-- Get Blog By Id -->
export const GET = async (req, { params }) => {
    try {
        // <!-- Checking user role for admin -->
        const { role } = JSON.parse(headers().get("userInfo"));
        if (!["admin", "sub-admin"].includes(role)) {
            return NextResponse.json({ error: "You are not allowed for this route!" }, { status: 403 });
        }

        const result = await Blog.findById({ _id: params.id });

        if (!result) return NextResponse.json({ error: "No result found!" }, { status: 404 });

        return NextResponse.json(result, { status: 200 });
    } catch (error) {
        if (error.name === "CastError") return NextResponse.json({ error: "No result found!" }, { status: 404 });
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};

// <!-- Update Blog By Id -->
export const PATCH = async (req, { params }) => {
    try {
        // <!-- Checking user role for admin -->
        const { role } = JSON.parse(headers().get("userInfo"));
        if (!["admin", "sub-admin"].includes(role)) {
            return NextResponse.json({ error: "You are not allowed for this route!" }, { status: 403 });
        }

        const blog = await Blog.findById({ _id: params.id });
        if (!blog) {
            return NextResponse.json({ error: "No result found!" }, { status: 404 });
        }

        // <!-- Blog Data -->
        const formData = await req.formData();
        const body = {};
        for (const [name, value] of formData.entries()) {
            body[name] = value;
        }

        let coverPhoto_src;
        if (typeof body.coverPhoto_src === "object") {
            const bytesImage = await body.coverPhoto_src.arrayBuffer();
            const bytes = Buffer.from(bytesImage);
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
            console.log(uploadResult);

            coverPhoto_src = uploadResult.secure_url;

            if (blog.coverPhoto_src) {
                const pathSegments = blog.coverPhoto_src.split("/");
                const lastSegment = pathSegments[pathSegments.length - 1];
                const publicId = lastSegment.split(".")[0];
                const result = await cloudinary.uploader.destroy(`Review-Holder/blogs/cover_photo/${publicId}`);
            }
        } else {
            coverPhoto_src = body.coverPhoto_src;
        }

        const result = await Blog.findByIdAndUpdate(
            { _id: params.id },
            {
                $set: {
                    ...body,
                    coverPhoto_src: coverPhoto_src,
                    pathName: "/" + convertStr(body.pathName),
                },
            }
        );

        if (result) {
            return NextResponse.json({ success: "Blog update successfully" }, { status: 200 });
        } else {
            return NextResponse.json({ error: "Something went wrong!" }, { status: 500 });
        }
    } catch (error) {
        if (error.name === "CastError") return NextResponse.json({ error: "No result found!" }, { status: 404 });
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};

// <!-- Delete a blog by ID -->
export const DELETE = async (req, { params }) => {
    try {
        // <!-- Checking user role for 'admin' or 'sub-admin' -->
        const { id, role } = JSON.parse(headers().get("userInfo"));
        if (!["admin", "sub-admin"].includes(role)) {
            return NextResponse.json({ error: "You are not allowed for this route!" }, { status: 403 });
        }

        const blog = await Blog.findById({ _id: params.id }).populate("author");

        if (blog) {
            if (blog.author._id.equals(id) || role === "admin") {
                const imageName = await blog.coverPhoto_src.replace(/^\/blogs\/cover_photo\//, "");
                await fs.unlink(resolve("./public/blogs/cover_photo", imageName));

                // <!-- Delete images from cloudinary -->
                const pathSegments = blog.coverPhoto_src.split("/");
                const lastSegment = pathSegments[pathSegments.length - 1];
                const publicId = lastSegment.split(".")[0];
                await cloudinary.uploader.destroy(`Review-Holder/blogs/cover_photo/${publicId}`);

                await Blog.findByIdAndDelete({ _id: params.id });
                return NextResponse.json({ success: "Delete successful!" }, { status: 200 });
            } else {
                return NextResponse.json({ error: "You have no right to delete this blog!" }, { status: 403 });
            }
        } else {
            return NextResponse.json({ error: "Something went wrong!" }, { status: 404 });
        }
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};
