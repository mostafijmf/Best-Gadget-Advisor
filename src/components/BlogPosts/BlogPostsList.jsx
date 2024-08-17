import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import BlogCard from "./BlogCard";

const BlogPostsList = ({ blogs }) => {
    return (
        <div className="max-w-4xl w-full flex flex-col md:gap-10 gap-7">
            {blogs?.map((blog) => (
                <div key={blog._id}>
                    <article className="flex items-start gap-7 max-md:hidden">
                        <div className="w-max">
                            <Link href={blog.pathName} className="hover:bg-white">
                                <Image
                                    src={blog.coverPhoto_src}
                                    alt={blog.coverPhoto_alt}
                                    width={300}
                                    height={300}
                                    className="w-60 h-auto"
                                />
                            </Link>
                        </div>
                        <div className="w-[calc(100%-240px)] text-primary">
                            <div>
                                <h2>
                                    <Link href={blog.pathName} className="text-2xl font-semibold hover:underline">
                                        {blog.title}
                                    </Link>
                                </h2>
                                <p className="text-lg my-3">{blog.metaDescription}</p>
                                <time className="text-sm text-gray-500">
                                    {dayjs(blog.createdAt).format("DD-MMM-YYYY")}
                                </time>
                            </div>
                        </div>
                    </article>
                    <BlogCard key={blog._id} blog={blog} className="md:hidden max-w-sm mx-auto" />
                </div>
            ))}
        </div>
    );
};

export default BlogPostsList;
