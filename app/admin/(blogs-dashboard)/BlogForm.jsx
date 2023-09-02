import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { toast } from "react-hot-toast";
import InputForm from "@/components/InputForm";
import TextEditor from "@/components/TextEditor";
import { getBlogPathName } from "@/libs/apiServices";
import Textarea from "@/components/Textarea";
import BtnLoading from "@/components/Spinners/BtnLoading";


const BlogForm = ({ handleSubmit, formData, setFormData, formErrors, loading }) => {
    const [pathData, setPathData] = useState({ unique: null, error: '', success: '', loading: false });
    const [pathValue, setPathValue] = useState('');


    // <!-- Fetch PathName -->
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (pathValue.trim() !== '') {
                setPathData({ ...pathData, loading: true });
                getBlogPathName(pathValue)
                    .then(data =>
                        setPathData({
                            unique: data?.unique,
                            error: data?.error || '',
                            success: data?.success || '',
                            loading: false
                        }))
                    .catch(error => {
                        const err = error?.response?.data?.error;
                        err && toast.error(err, {
                            style: { borderRadius: '8px', background: '#151c48', color: '#fff', maxWidth: '600px', }
                        })

                    })
            }
            else {
                setPathData({ unique: null, error: '', success: '', loading: false })
            };
        }, 200);

        return () => clearTimeout(delayDebounceFn);
    }, [pathValue]);


    // <!-- onChange input -->
    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === 'pathName') {
            setPathValue(value)
        }
        if (name === 'coverPhoto_src') {
            setFormData({ ...formData, coverPhoto_src: event.target.files[0] })
        }
        else {
            setFormData({ ...formData, [name]: value });
        }
    };

    return (
        <div>
            <form
                onSubmit={handleSubmit}
                className='max-w-full mx-auto border rounded-md my-6 p-9 flex flex-col gap-5 text-primary'
            >
                <InputForm
                    label="Title"
                    type="text" name="title"
                    onChange={handleChange}
                    defaultValue={formData.title}
                    error={formErrors?.title || ''}
                />
                <div className="">
                    <p className='block w-full font-medium mb-0.5'>
                        Cover Photo
                    </p>
                    <div className="flex items-start gap-5">
                        <InputForm
                            label="Select a photo"
                            type="file" name="coverPhoto_src"
                            accept="image/*"
                            onChange={handleChange}
                            defaultValue={formData.coverPhoto_src}
                            error={formErrors?.coverPhoto_src || ''}
                        />
                        <InputForm
                            type="text" name="coverPhoto_alt"
                            onChange={handleChange}
                            placeholder="Image alt"
                            defaultValue={formData.coverPhoto_alt}
                            error={formErrors?.coverPhoto_alt || ''}
                        />
                    </div>
                </div>
                <div>
                    <InputForm
                        label="Path Name"
                        type="text" name="pathName"
                        onChange={handleChange}
                        defaultValue={formData.pathName}
                        error={formErrors?.pathName || ''}
                    />
                    {pathData.loading &&
                        <span className="text-xs flex gap-1 pt-1">Checking<Icon icon="svg-spinners:3-dots-fade" width="16" /></span>
                    }
                    {
                        pathData.loading === false && <>
                            {pathData?.unique &&
                                <div className='mt-1 text-sm text-emerald-500 flex gap-1.5 items-start'>
                                    <div className="block w-max pt-0.5">
                                        <Icon icon="line-md:confirm-circle-twotone" width="16" />
                                    </div>
                                    <p>{pathData?.success}</p>
                                </div>
                            }

                            {pathData?.unique === false &&
                                <div className='mt-1 text-sm text-red-500 flex gap-1.5 items-start'>
                                    <div className="block w-max pt-0.5">
                                        <Icon icon="pajamas:warning-solid" width="16" />
                                    </div>
                                    <p>{pathData?.error}</p>
                                </div>
                            }
                        </>
                    }
                </div>

                <Textarea
                    label="Meta Description"
                    name="metaDescription"
                    placeholder="Description should be up to 200 characters..."
                    onChange={handleChange}
                    defaultValue={formData.metaDescription}
                    error={formErrors?.metaDescription || ''}
                />

                <div>
                    <p className='block w-full font-medium mb-0.5'>
                        Content
                    </p>
                    <TextEditor
                        content={formData}
                        setContent={setFormData}
                        error={formErrors?.content || ''}
                    />
                </div>
                <div className='w-full text-center mt-5 mb-2'>
                    <button
                        className='btn btn-primary w-full'
                        type="submit"
                        disabled={loading}
                    >
                        {
                            loading ? <BtnLoading /> : 'Create Blog'
                        }
                    </button>
                </div>
            </form>
        </div>
    );
};

export default BlogForm;