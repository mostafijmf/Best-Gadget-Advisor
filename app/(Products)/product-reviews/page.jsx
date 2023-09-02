import Link from "next/link";
import { Suspense } from "react";
import { getBlogs } from "@/libs/apiServices";
import BlogPostsList from "@/components/BlogPosts/BlogPostsList";
import PageLoading from "@/components/Spinners/PageLoading";
import ResultNotFound from "@/components/ResultNotFound";
import Icons from "@/components/Icons";

export const metadata = { title: 'Product Reviews' };

const ProductReviews = async ({ searchParams }) => {
    const query = searchParams?.posts || '';
    const page = Number(searchParams?.page) || 1;
    const size = 10;
    const { blogs, totalPage } = await getBlogs(query, page, size);

    return (<>
        <div className='container mt-20 mb-28'>
            <section>
                <div className='flex items-center max-sm:justify-between lg:gap-8 gap-5 border-b-4 border-primary lg:text-2xl text-xl font-medium text-primary pb-2'>
                    <Link
                        href={'/product-reviews'}
                        className={`cursor-pointer ${(query !== 'latest' && query !== 'popular') && 'text-secondary'}`}
                    >
                        All Posts
                    </Link>
                    <Link
                        href={`/product-reviews?posts=latest`}
                        className={`cursor-pointer ${query === 'latest' && 'text-secondary'}`}
                    >
                        Latest Posts
                    </Link>
                    <Link
                        href={`/product-reviews?posts=popular`}
                        className={`cursor-pointer ${query === 'popular' && 'text-secondary'}`}
                    >
                        Popular Posts
                    </Link>
                </div>
                <div className='py-10'>
                    <Suspense fallback={<PageLoading />}>
                        {blogs.length === 0 ?
                            <ResultNotFound /> : <>
                                <BlogPostsList blogs={blogs} />
                                {/* <!-- Pagination --> */}
                                {totalPage > 1 &&
                                    <div className='w-max mx-auto mt-24'>
                                        <ul className='list-none flex items-center gap-2 text-gray-700'>
                                            <li className="grid place-items-center">
                                                {page !== 1 ?
                                                    <Link
                                                        href={`/product-reviews?${query && `posts=${query}`}&page=${page - 1}`}
                                                        className={`bg-primary text-white duration-200 mr-3 px-2.5 py-2 rounded`}
                                                    >
                                                        <Icons icon="ep:arrow-left-bold" width="20" />
                                                    </Link>
                                                    :
                                                    <div className={`bg-gray-300 text-white duration-200 mr-3 px-2.5 py-2 rounded`}>
                                                        <Icons icon="ep:arrow-left-bold" width="20" />
                                                    </div>
                                                }
                                            </li>
                                            {
                                                [...Array(totalPage).keys()].map(item =>
                                                    <li key={item}>
                                                        <Link
                                                            href={`/product-reviews?${query && `posts=${query}`}&page=${item + 1}`}
                                                            className={`${page === item + 1 ? 'bg-primary text-white' : 'text-primary'} py-1.5 px-3 rounded`}
                                                        >
                                                            {item + 1}
                                                        </Link>
                                                    </li>
                                                )
                                            }
                                            <li className="grid place-items-center">
                                                {totalPage !== page ?
                                                    <Link
                                                        href={`/product-reviews?${query && `posts=${query}`}&page=${page + 1}`}
                                                        className={`bg-primary text-white duration-200 ml-3 px-2.5 py-2 rounded`}
                                                    >
                                                        <Icons icon="ep:arrow-right-bold" width="20" />
                                                    </Link>
                                                    :
                                                    <div className={`bg-gray-300 text-white duration-200 ml-3 px-2.5 py-2 rounded`}>
                                                        <Icons icon="ep:arrow-right-bold" width="20" />
                                                    </div>
                                                }
                                            </li>
                                        </ul>
                                    </div >
                                }
                            </>
                        }
                    </Suspense>
                </div>
            </section>
        </div>
    </>);
};

export default ProductReviews;