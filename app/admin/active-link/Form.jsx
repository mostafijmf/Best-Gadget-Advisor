'use client';
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import InputForm from "@/components/InputForm";
import BtnLoading from "@/components/Spinners/BtnLoading";
import { formValidator } from "@/libs/formValidator";
import { activateUser } from "@/libs/apiServices";


const Form = ({ data }) => {
    const [formData, setFormData] = useState({ name: '', password: '' });
    const [formErrors, setFormErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    // <!-- onChange input -->
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    // <!-- Handle Submit -->
    const handleSubmit = async (event) => {
        event.preventDefault();
        const errors = await formValidator(formData, { isActivateUser: true });

        if (Object.keys(errors).length === 0) {
            setFormErrors({});
            try {
                setLoading(true);
                const res = await activateUser({
                    ...data,
                    name: formData.name,
                    password: formData.password,
                });
                res?.success && (
                    router.push('/admin'),
                    toast.success(res.success, {
                        style: { borderRadius: '8px', background: '#151c48', color: '#fff', maxWidth: '600px', }
                    })
                );
            }
            catch (error) {
                const err = error?.response?.data?.error
                err && toast.error(err, {
                    style: {
                        borderRadius: '8px',
                        background: '#151c48',
                        color: '#fff',
                    }
                })
            }
            finally { setLoading(false); }
        }
        else {
            setFormErrors(errors);
        };
    };

    return (
        <form
            onSubmit={handleSubmit}
            className='max-w-lg w-full h-auto mx-auto rounded-md backdrop-blur-sm my-20 flex flex-col gap-5 text-primary text-base'
        >
            <h1 className='text-4xl font-semibold text-center mb-10'>Create Account</h1>

            <InputForm
                label="Your Name"
                type="text" name="name"
                onChange={handleChange}
                error={formErrors?.name || ''}
            />
            <InputForm
                label="Password"
                type="password" name="password"
                onChange={handleChange}
                error={formErrors?.password || ''}
            />
            <div className='w-full text-center mt-5 mb-2'>
                <button
                    className='btn btn-primary w-full'
                    type='submit'
                    disabled={loading}
                >
                    {
                        loading ? <BtnLoading /> : 'Submit'
                    }
                </button>
            </div>
        </form>
    );
};

export default Form;