"use client";
import { useRouter, useSearchParams } from "next/navigation";
import PageLoading from "@/components/Spinners/PageLoading";
import useGetBlogById from "@/hooks/useApi/useGetBlogById";
import ResultNotFound from "@/components/ResultNotFound";
import BlogForm from "../BlogForm";
import { useEffect, useState } from "react";
import { formValidator } from "@/libs/formValidator";
import { updateBlog } from "@/libs/apiServices";
import { toast } from "react-hot-toast";
import { Icon } from "@iconify/react";
import { scrollToElement } from "@/libs/scrollToElement";

const BlogEditForm = () => {
    const router = useRouter();
    const id = useSearchParams().get('id');
    const [blog, loading] = useGetBlogById(id);
    const [formData, setFormData] = useState({
        title: '',
        coverPhoto_src: '',
        coverPhoto_alt: '',
        pathName: '',
        metaDescription: '',
        content: ''
    });
    const [formErrors, setFormErrors] = useState({});
    const [updateLoading, setUpdateLoading] = useState(false);

    useEffect(() => {
        if (blog) {
            setFormData({
                title: blog.title,
                coverPhoto_src: blog.coverPhoto_src,
                coverPhoto_alt: blog.coverPhoto_alt,
                pathName: blog.pathName,
                metaDescription: blog.metaDescription,
                content: blog.content,
            })
        }
    }, [blog]);


    // <!-- Handle Update Blog -->
    const handleUpdate = async (e) => {
        e.preventDefault();
        const errors = await formValidator(formData, { isCreateBlog: true });

        if (Object.keys(errors).length === 0) {
            setFormErrors({});
            try {
                setUpdateLoading(true);
                const data = new FormData()
                data.set('title', formData.title)
                data.set('coverPhoto_src', formData.coverPhoto_src)
                data.set('coverPhoto_alt', formData.coverPhoto_alt)
                data.set('pathName', formData.pathName)
                data.set('metaDescription', formData.metaDescription)
                data.set('content', formData.content)

                const result = await updateBlog(blog?._id, data);
                result?.success && toast.success(result?.success, {
                    duration: 4000,
                    style: { borderRadius: '8px', background: '#151c48', color: '#fff', maxWidth: '600px', }
                });
                e.target.reset();
                router.push(`/admin/all-blogs`);
            }
            catch (error) {
                const err = error?.response?.data?.error
                err && toast.error(err, {
                    style: { borderRadius: '8px', background: '#151c48', color: '#fff', maxWidth: '600px', }
                })
            }
            finally { setUpdateLoading(false) }
        }
        else {
            setFormErrors(errors);
            scrollToElement(Object.keys(errors)[0]);
        }
    };


    return (<div className="pr-5">
        <div className="relative">
            <div className="absolute top-4 left-0">
                <button
                    onClick={() => router.back()}
                    className="btn-sm border-transparent hover:border-primary shadow-[0_0_#000_!important] flex items-center gap-2"
                >
                    <Icon icon="guidance:right-arrow" width="20" />
                    Back
                </button>
            </div>
            <h1 className="text-3xl font-semibold text-center py-4">Update Blog</h1>
        </div>
        {
            loading ? <PageLoading /> : (blog ?
                <div>
                    <BlogForm
                        blog={blog}
                        handleSubmit={handleUpdate}
                        formData={formData}
                        setFormData={setFormData}
                        formErrors={formErrors}
                        loading={updateLoading}
                    />
                </div>
                :
                <ResultNotFound />
            )
        }
    </div>);
};

export default BlogEditForm;