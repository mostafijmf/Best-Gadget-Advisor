'use client';
import { useState } from "react";
import toast from "react-hot-toast";
import InputForm from "@/components/InputForm";
import BtnLoading from "@/components/Spinners/BtnLoading";
import { updateUserInfo } from "@/libs/apiServices";

const OtpForm = ({ setOpenEdit }) => {
    const [otp, setOtp] = useState(null);
    const [loading, setLoading] = useState(null);

    // <!-- Handle Submit OTP -->
    const handleSubmit = async () => {
        try {
            setLoading(true);
            const res = await updateUserInfo('', otp);
            res?.success && toast.success(res.success, {
                duration: 4000,
                style: { borderRadius: '8px', background: '#151c48', color: '#fff', maxWidth: '600px', }
            });
            setOpenEdit(false);

        } catch (error) {
            const err = error?.response?.data?.error
            err && toast.error(err, {
                style: {
                    borderRadius: '8px',
                    background: '#151c48',
                    color: '#fff',
                }
            });
        } finally { setLoading(false); }
    };

    return (
        <div className="relative z-50 max-w-lg w-11/12 h-auto bg-white text-primary rounded-md p-8">
            <h1 className="text-2xl font-semibold text-center">
                Enter OTP Code
            </h1>
            <div className="mt-10">
                <InputForm onChange={(e) => setOtp(e.target.value)} />
                <div className="text-center pt-8">
                    <button
                        type="submit"
                        className="btn btn-primary mx-0"
                        onClick={handleSubmit}
                        disabled={loading}
                    >
                        {
                            loading ? <BtnLoading /> : 'Submit'
                        }
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OtpForm;