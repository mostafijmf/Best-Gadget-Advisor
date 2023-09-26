import { getBlogs } from "@/libs/apiServices";

const sitemap = async () => {
    const { blogs } = await getBlogs('all');

    const blogUrls = blogs?.map(blog => ({
        url: process.env.NEXT_PUBLIC_BASE_URL + blog.pathName,
        lastModified: blog.updatedAt,
    }));

    return [
        { url: process.env.NEXT_PUBLIC_BASE_URL, lastModified: new Date(), },
        { url: `${process.env.NEXT_PUBLIC_BASE_URL}/product-reviews`, lastModified: new Date(), },
        { url: `${process.env.NEXT_PUBLIC_BASE_URL}/contact`, lastModified: new Date(), },
        { url: `${process.env.NEXT_PUBLIC_BASE_URL}/about`, lastModified: new Date(), },
        { url: `${process.env.NEXT_PUBLIC_BASE_URL}/privacy-and-policy`, lastModified: new Date(), },
        ...blogUrls,
    ];
};

export default sitemap;