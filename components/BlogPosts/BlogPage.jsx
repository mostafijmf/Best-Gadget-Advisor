import Image from "next/image";

const BlogPage = ({ data }) => {
    const { title, coverPhoto_src, coverPhoto_alt, content } = data;

    return (
        <div className='max-w-2xl mx-auto'>
            <div className=''>
                <h1 className='text-4xl font-semibold text-primary mb-5 text-center'>
                    {title}
                </h1>
                <Image
                    src={coverPhoto_src} alt={coverPhoto_alt}
                    className="w-full h-auto"
                    sizes="100vw"
                    width={400}
                    height={300}
                    quality={100}
                    priority={true}
                />
                <div className="mt-10 text-lg" dangerouslySetInnerHTML={{ __html: content }} />
            </div>
        </div>
    );
};

export default BlogPage;