"use client";
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { formValidator } from '@/libs/formValidator';
import { loginAdmin } from '@/libs/apiServices';
import InputForm from '@/components/InputForm';
import BtnLoading from '@/components/Spinners/BtnLoading';

const AdminLogin = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [formErrors, setFormErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const params = useSearchParams().get('redirect');

    // <!-- onChange input -->
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };


    // <!-- Handle Login -->
    const handleLogin = async (e) => {
        e.preventDefault();
        const errors = await formValidator(formData, { isLogin: true });

        if (Object.keys(errors).length === 0) {
            setFormErrors({});
            try {
                setLoading(true);
                const data = await loginAdmin(formData);
                data && params ? router.push(params) : router.push('/admin');
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
        }
    };

    return (
        <div className='overflow-y-auto w-full h-screen max-h-full bg_gradient'>
            <div className="container">
                <form
                    onSubmit={handleLogin}
                    className='max-w-lg mx-auto border rounded-md backdrop-blur-sm my-20 p-9 flex flex-col gap-5 text-primary'
                >
                    <h1 className='text-4xl font-semibold text-center mb-2'>Login</h1>

                    <InputForm
                        label="Email Address"
                        type="email" name="email"
                        onChange={handleChange}
                        error={formErrors?.email || ''}
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
                                loading ? <BtnLoading /> : 'Login'
                            }
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default AdminLogin;