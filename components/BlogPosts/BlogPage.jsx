import dayjs from "dayjs";
import Image from "next/image";

const BlogPage = ({ data }) => {
    const { title, author, updatedAt, coverPhoto_src, coverPhoto_alt, content } = data;

    return (
        <article className='w-full'>
            <h1 className='text-4xl font-semibold text-primary mb-2'>
                {title}
            </h1>
            <div className="flex flex-col items-end text-sm text-gray-500 mb-6">
                <span>Updated {dayjs(updatedAt).format('MMM DD YYYY')},</span>
                <span itemProp="author">By {author.name}</span>
            </div>
            <Image
                src={coverPhoto_src} alt={coverPhoto_alt}
                className="w-full h-auto rounded-md"
                sizes="100vw"
                width={400}
                height={300}
                quality={100}
                priority={true}
            />
            <div className="mt-10 text-lg text-primary" dangerouslySetInnerHTML={{ __html: content }} />
        </article>
    );
};

export default BlogPage;