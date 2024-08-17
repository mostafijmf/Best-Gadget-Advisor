import Link from "next/link";
import { Suspense } from "react";
import Footer from "@/components/Footer";
import PageLoading from "@/components/Spinners/PageLoading";
import ResultNotFound from "@/components/ResultNotFound";
import { getBlogs } from "@/libs/apiServices";
import Navbar from "@/components/Navbar/Navbar";
import Icons from "@/components/Icons";
import BlogCard from "@/components/BlogPosts/BlogCard";

const Home = async () => {
    const [{ blogs: latestBlogs }, { blogs: popularBlogs }] = await Promise.all([
        getBlogs("latest"),
        getBlogs("popular"),
    ]);

    return (
        <>
            <Navbar className="bg-transparent" />
            <section>
                <div className="container mx-auto">
                    <div className="py-20 text-center">
                        <span className="text-xl font-medium text-secondary block pb-5">We are here</span>
                        <h1 className="max-w-4xl mx-auto lg:text-6xl md:text-5xl text-4xl font-bold text-primary leading-[1.2] tracking-tight capitalize">
                            To make it easier to find the best product for your needs.
                        </h1>
                    </div>
                </div>
            </section>
            <Suspense fallback={<PageLoading />}>
                <section className="container mx-auto mt-20">
                    <div className="border-b-4 border-primary pb-2">
                        <h3 className="text-primary lg:text-2xl text-xl font-medium">Latest Posts</h3>
                    </div>

                    <div
                        className={`grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-y-10 gap-x-8 my-6`}
                    >
                        {latestBlogs.length === 0 ? (
                            <ResultNotFound />
                        ) : (
                            <>
                                {latestBlogs.map((blog) => (
                                    <BlogCard blog={blog} key={blog._id} />
                                ))}
                                <Link
                                    href={`/product-reviews?posts=latest`}
                                    className="w-full h-full py-24 grid place-items-center rounded-md backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,.12)] group/card"
                                >
                                    <div className="flex items-center gap-2 group-hover/card:gap-3 text-base font-semibold text-primary group-hover/card:text-secondary duration-300">
                                        More post
                                        <Icons icon="guidance:left-arrow" width="20" />
                                    </div>
                                </Link>
                            </>
                        )}
                    </div>
                </section>

                <section className="container mx-auto my-24">
                    <div className="border-b-4 border-primary pb-2">
                        <h3 className="text-primary lg:text-2xl text-xl font-medium">Popular Posts</h3>
                    </div>

                    <div
                        className={`grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-y-10 gap-x-8 my-6`}
                    >
                        {popularBlogs.length === 0 ? (
                            <ResultNotFound />
                        ) : (
                            <>
                                {popularBlogs.map((blog) => (
                                    <BlogCard blog={blog} key={blog._id} />
                                ))}
                                <Link
                                    href={`/product-reviews?posts=popular`}
                                    className="w-full h-full py-24 grid place-items-center rounded-md backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,.12)] group/card"
                                >
                                    <div className="flex items-center gap-2 group-hover/card:gap-3 text-base font-semibold text-primary group-hover/card:text-secondary duration-300">
                                        More post
                                        <Icons icon="guidance:left-arrow" width="20" />
                                    </div>
                                </Link>
                            </>
                        )}
                    </div>
                </section>
            </Suspense>
            <Footer />
        </>
    );
};

export default Home;
