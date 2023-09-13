'use client';
import { useState } from "react";
import { toast } from "react-hot-toast";
import { formValidator } from "@/libs/formValidator";
import { createBlog } from "@/libs/apiServices";
import BlogForm from "../BlogForm";
import { scrollToElement } from "@/libs/scrollToElement";
import { useRouter } from "next/navigation";


const CreateBlog = () => {
    const [formData, setFormData] = useState({
        title: '',
        coverPhoto_src: '',
        coverPhoto_alt: '',
        pathName: '',
        metaDescription: '',
        content: ''
    });
    const [formErrors, setFormErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    // <!-- Handle Create Blog -->
    const handleCreateBlog = async (e) => {
        e.preventDefault();
        const errors = await formValidator(formData, { isCreateBlog: true });

        if (Object.keys(errors).length === 0) {
            setFormErrors({});
            try {
                setLoading(true);
                const data = new FormData()
                data.set('title', formData.title)
                data.set('coverPhoto_src', formData.coverPhoto_src)
                data.set('coverPhoto_alt', formData.coverPhoto_alt)
                data.set('pathName', formData.pathName)
                data.set('metaDescription', formData.metaDescription)
                data.set('content', formData.content)

                const result = await createBlog(data);
                result?.success && toast.success(result?.success, {
                    duration: 4000,
                    style: { borderRadius: '8px', background: '#151c48', color: '#fff', maxWidth: '600px', }
                });
                e.target.reset();
                router.push('/admin/all-blogs');
            }
            catch (error) {
                const err = error?.response?.data?.error
                err && toast.error(err, {
                    style: { borderRadius: '8px', background: '#151c48', color: '#fff', maxWidth: '600px', }
                })
            }
            finally {
                setLoading(false);
            }
        }
        else {
            setFormErrors(errors);
            scrollToElement(Object.keys(errors)[0]);
        }
    };


    return (
        <div className="py-10">
            <h1 className="text-3xl font-semibold text-primary text-center">Create Blog</h1>
            <BlogForm
                handleSubmit={handleCreateBlog}
                formData={formData}
                setFormData={setFormData}
                formErrors={formErrors}
                loading={loading}
            />
        </div>
    );
};

export default CreateBlog;