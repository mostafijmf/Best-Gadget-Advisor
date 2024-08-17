import { useState } from "react";
import toast from "react-hot-toast";
import InputForm from "@/components/InputForm";
import { formValidator } from "@/libs/formValidator";
import BtnLoading from "@/components/Spinners/BtnLoading";
import { updateUserInfo } from "@/libs/apiServices";
import OtpForm from "./OtpForm";

const EditForm = ({ user, setOpenEdit }) => {
    const [formData, setFormData] = useState({ email: user.email, name: user.name });
    const [formErrors, setFormErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [isOTP, setIsOTP] = useState(false);

    // <!-- onChange input -->
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    // <!-- Handle Update data -->
    const handleUpdate = async (event) => {
        event.preventDefault();
        const errors = await formValidator(formData, { isUpdateAccInfo: true });
        if (Object.keys(errors).length === 0) {
            setFormErrors({});
            try {
                setLoading(true);
                const res = await updateUserInfo(formData);
                res?.success && toast.success(res.success, {
                    duration: 4000,
                    style: { borderRadius: '8px', background: '#151c48', color: '#fff', maxWidth: '600px', }
                });
                if (res?.isOTPSend) return setIsOTP(true);
                setOpenEdit(false)
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

    return (<>
        <div className='fixed inset-0 bg-black/50 z-50 grid place-items-center overflow-y-auto'>
            <div className="absolute inset-0 z-0" onClick={() => setOpenEdit(false)} />
            {
                isOTP ? <OtpForm setOpenEdit={setOpenEdit} /> :
                    <div className="relative z-50 max-w-lg w-11/12 h-auto bg-white text-primary rounded-md p-8">
                        <h1 className="text-2xl font-semibold text-center">
                            Personal Information
                        </h1>
                        <form onSubmit={handleUpdate} className="flex flex-col gap-5 mt-5">
                            <InputForm
                                name="name"
                                label="Name"
                                type="text"
                                defaultValue={formData.name}
                                onChange={handleChange}
                                error={formErrors?.name || ''}
                            />
                            <InputForm
                                name="email"
                                label="Email"
                                type="email"
                                defaultValue={formData.email}
                                onChange={handleChange}
                                error={formErrors?.email || ''}
                            />

                            <div className="flex items-center justify-end gap-5 py-3">
                                <div
                                    onClick={() => setOpenEdit(false)}
                                    className="px-10 py-[9px] rounded border text-gray-500 bg-white border-gray-200 hover:bg-gray-100 duration-300 cursor-pointer"
                                >Cancel</div>
                                <button type="submit" className="btn btn-primary mx-0" disabled={loading}>
                                    {
                                        loading ? <BtnLoading /> : 'Update'
                                    }
                                </button>
                            </div>
                        </form>
                    </div>
            }
        </div>
    </>);
};

export default EditForm;