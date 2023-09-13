import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';
import BlogCard from './BlogCard';

const BlogPostsList = ({ blogs }) => {

    return (<>
        <div className='max-w-4xl w-full flex flex-col md:gap-10 gap-7'>
            {
                blogs?.map(blog => <>
                    <div key={blog._id} className='flex items-start gap-7 max-md:hidden'>
                        <div className='w-max'>
                            <Link href={blog.pathName} className='hover:bg-white'>
                                <Image
                                    src={blog.coverPhoto_src}
                                    alt={blog.coverPhoto_alt}
                                    width={240}
                                    height={100}
                                    className='w-60 h-auto'
                                />
                            </Link>
                        </div>
                        <div className='w-[calc(100%-240px)] text-primary'>
                            <div>
                                <Link href={blog.pathName} className='text-2xl font-semibold hover:underline'>
                                    {blog.title}
                                </Link>
                                <p className='text-lg my-3'>
                                    {blog.metaDescription}
                                </p>
                                <p className='text-sm text-gray-500'>
                                    {dayjs(blog.createdAt).format("DD-MMM-YYYY")}
                                </p>
                            </div>
                        </div>
                    </div>
                    <BlogCard key={blog._id} blog={blog} className="md:hidden max-w-sm mx-auto" />
                </>
                )
            }
        </div>
    </>);
};

export default BlogPostsList;