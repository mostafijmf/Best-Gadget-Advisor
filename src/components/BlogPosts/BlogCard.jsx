import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";

const BlogCard = ({ blog, className = "" }) => {
    return (
        <article className={`w-full h-min rounded-md overflow-hidden bg-white shadow-[0_8px_30px_rgba(0,0,0,.12)] mx-auto group/card ${className}`}>
            <Link href={blog.pathName} className='w-full h-full block'>
                <div className='w-full h-44'>
                    <Image
                        src={blog.coverPhoto_src}
                        alt={blog.coverPhoto_alt}
                        width={300}
                        height={300}
                        className='w-full h-full object-cover'
                    />
                </div>
                <div className='w-full px-5 py-3'>
                    <h4 className='text-lg text-primary font-semibold group-hover/card:underline'>{blog.title}</h4>
                    <p className='text-sm text-gray-600 my-2'>{blog.metaDescription}</p>
                    <time className='text-sm text-gray-600'>
                        {dayjs(blog.createdAt).format("DD-MMM-YYYY")}
                    </time>
                </div>
            </Link>
        </article>
    );
};

export default BlogCard;