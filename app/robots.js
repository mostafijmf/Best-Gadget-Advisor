const robots = () => {
    return {
        rules: {
            userAgent: '*',
            disallow: '/admin/',
            disallow: '/admin/*',
        },
        sitemap: `${process.env.NEXT_PUBLIC_BASE_URL}/sitemap.xml`,
    }
};

export default robots;