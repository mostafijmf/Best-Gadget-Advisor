"use client";
import { Icon } from "@iconify/react";
import { useRouter, useSearchParams } from "next/navigation";
import BlogPage from "@/components/BlogPosts/BlogPage";
import PageLoading from "@/components/Spinners/PageLoading";
import ResultNotFound from "@/components/ResultNotFound";
import Link from "next/link";
import useGetBlogById from "@/hooks/useApi/useGetBlogById";


const BlogDetails = () => {
    const router = useRouter();
    const id = useSearchParams().get('id');
    const [blog, loading] = useGetBlogById(id);


    return (<>

        <div className="container">
            <section className="border-b relative text-primary">
                <div className="absolute top-4 left-0">
                    <button
                        onClick={() => router.back()}
                        className="btn-sm border-transparent hover:border-primary shadow-[0_0_#000_!important] flex items-center gap-2"
                    >
                        <Icon icon="guidance:right-arrow" width="20" />
                        Back
                    </button>
                </div>
                <div className="absolute top-4 right-0">
                    <Link
                        href={{
                            pathname: "/admin/blog-edit",
                            query: `id=${blog?._id}`
                        }}
                        className="btn-sm border-transparent hover:border-primary shadow-[0_0_#000_!important] flex items-center gap-2"
                    >
                        <Icon icon="nimbus:edit" width="18" />
                        Edit
                    </Link>
                </div>
                <h1 className="text-3xl font-semibold text-center py-4">Blog Details</h1>
            </section>
            {loading ?
                <PageLoading />
                :
                <section className="w-full h-auto mt-3 mb-20">
                    {blog ?
                        <BlogPage data={blog} />
                        :
                        <ResultNotFound />
                    }
                </section>
            }
        </div>

    </>);
};

export default BlogDetails;