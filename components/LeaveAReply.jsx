'use client';
import { useState } from "react";
import { toast } from "react-hot-toast";
import { formValidator } from "@/libs/formValidator";
import InputForm from "./InputForm";
import Textarea from "./Textarea";
import { leaveAReply } from "@/libs/apiServices";
import { scrollToElement } from "@/libs/scrollToElement";
import BtnLoading from "./Spinners/BtnLoading";


const LeaveAReply = ({ blog }) => {
    const [formData, setFormData] = useState({ comment: '', name: '', email: '', website: '' });
    const [formErrors, setFormErrors] = useState({});
    const [loading, setLoading] = useState(false);

    // <!-- onChange input -->
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    // <!-- Handle Submit -->
    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = await formValidator(formData, { leaveAReply: true });

        if (Object.keys(errors).length === 0) {
            setFormErrors({});
            try {
                setLoading(true);
                const res = await leaveAReply({ ...formData, blogId: blog._id });
                
                res?.success && toast.success(res?.success, {
                    duration: 4000,
                    style: { borderRadius: '8px', background: '#151c48', color: '#fff', maxWidth: '600px', }
                });
                e.target.reset();
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
            scrollToElement(Object.keys(errors)[0]);
        }
    };


    return (
        <div className='max-w-2xl mx-auto rounded-md border border-primary p-7 my-20'>
            <div>
                <h2 className="text-xl font-black text-primary">Leave a Reply</h2>
                <p className="text-lg text-primary mt-3">
                    Your email address will not be published. Required fields are marked *
                </p>
            </div>
            <form onSubmit={handleSubmit} className="mt-10 flex flex-col gap-y-3">
                <Textarea
                    label="Comment *"
                    name="comment"
                    className="border-primary"
                    onChange={handleChange}
                    error={formErrors?.comment}
                />
                <InputForm
                    label="Name *"
                    name="name"
                    type="text"
                    className="border-primary"
                    onChange={handleChange}
                    error={formErrors?.name}
                />
                <InputForm
                    label="Email *"
                    name="email"
                    type="email"
                    className="border-primary"
                    onChange={handleChange}
                    error={formErrors?.email}
                />
                <InputForm
                    label="Website"
                    name="website"
                    type="text"
                    className="border-primary"
                    onChange={handleChange}
                />
                <div className="pt-5 pb-2">
                    <button type="submit" className="btn btn-primary" disabled={loading} >
                        {
                            loading ? <BtnLoading /> : 'Submit'
                        }
                    </button>
                </div>
            </form>
        </div>
    );
};

export default LeaveAReply;