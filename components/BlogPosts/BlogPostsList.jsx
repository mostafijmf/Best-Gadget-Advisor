import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';

const BlogPostsList = ({ blogs }) => {

    return (<>
        <div className='max-w-4xl w-full flex flex-col md:gap-10 gap-7'>
            {
                blogs?.map(blog =>
                    <div key={blog._id} className='flex items-start md:gap-7 gap-5'>
                        <div className='w-max'>
                            <Link href={blog.pathName} className='hover:bg-white'>
                                <Image
                                    src={blog.coverPhoto_src}
                                    alt={blog.coverPhoto_alt}
                                    width={240}
                                    height={100}
                                    className='md:w-60 sm:w-52 w-40 h-auto'
                                />
                            </Link>
                        </div>
                        <div className='md:w-[calc(100%-240px)] sm:w-[calc(100%-208px)] w-[calc(100%-160px)] text-primary'>
                            <div>
                                <Link href={blog.pathName} className='text-2xl font-semibold hover:underline'>
                                    {blog.title}
                                </Link>
                                <p className='text-lg max-md:hidden my-3'>
                                    {blog.metaDescription}
                                </p>
                                <p className='text-sm text-gray-500'>
                                    {dayjs(blog.createdAt).format("DD-MMM-YYYY")}
                                </p>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    </>);
};

export default BlogPostsList;