import { getBlogs } from "@/libs/apiServices";

const sitemap = async () => {
    const { blogs } = await getBlogs('all');

    const blogUrls = blogs.map(blog => ({
        url: process.env.CLIENT_URL + blog.pathName,
        lastModified: blog.updatedAt,
    }));

    return [
        { url: process.env.CLIENT_URL, lastModified: new Date(), },
        { url: `${process.env.CLIENT_URL}/product-reviews`, lastModified: new Date(), },
        { url: `${process.env.CLIENT_URL}/contact`, lastModified: new Date(), },
        { url: `${process.env.CLIENT_URL}/about`, lastModified: new Date(), },
        { url: `${process.env.CLIENT_URL}/privacy-and-policy`, lastModified: new Date(), },
        ...blogUrls,
    ];
};

export default sitemap;