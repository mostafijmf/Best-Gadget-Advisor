import { useState } from "react";
import { adminAddUser } from "@/libs/apiServices";
import InputForm from "@/components/InputForm";
import toast from "react-hot-toast";
import BtnLoading from "@/components/Spinners/BtnLoading";

const AddUser = ({ setAddUser }) => {
    const [loading, setLoading] = useState(false);

    // <!-- Handle Add User -->
    const handleAddUser = async (event) => {
        event.preventDefault();
        try {
            setLoading(true);
            const res = await adminAddUser({
                email: event.target.email.value,
                role: event.target.role.value,
                status: "active",
            });
            res?.success && (
                toast.success(res.success, {
                    duration: 4000,
                    style: { borderRadius: '8px', background: '#151c48', color: '#fff', maxWidth: '600px', }
                }),
                setAddUser(false)
            )
        }
        catch (error) {
            const err = error?.response?.data?.error
            err && toast.error(err, {
                style: {
                    borderRadius: '8px',
                    background: '#151c48',
                    color: '#fff',
                }
            });
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 bg-black/50 grid place-items-center">
            <div className="absolute inset-0 z-0" onClick={() => setAddUser(false)} />
            <div className="relative z-50 max-w-lg sm:w-full w-[95%] p-8 bg-white text-primary rounded overflow-hidden">
                <h1 className="text-xl font-semibold mb-5">Add User</h1>
                <form onSubmit={handleAddUser} className="flex flex-col gap-3" >
                    <InputForm
                        label="Email"
                        name="email"
                        type="email"
                        onChange={() => { }}
                    />
                    <div className="w-full text-base">
                        <label htmlFor="role" className='block w-full font-medium mb-0.5'>
                            Role
                        </label>
                        <select
                            name="role"
                            id="role"
                            className={`w-full h-11 border rounded-md outline-none px-3 text-gray-600 focus:border-gray-500`}
                            onChange={(e) => ''}
                        >
                            <option value="sub-admin">Sub-admin</option>
                        </select>
                    </div>
                    <div className="flex items-center justify-end gap-5 mt-5">
                        <div className="cursor-pointer px-8 py-2.5 rounded hover:bg-slate-200 duration-300 mx-0" onClick={() => setAddUser(false)}>
                            Cancel
                        </div>
                        <button type="submit" disabled={loading} className="btn btn-primary mx-0">
                            {loading ? <BtnLoading /> : 'Add'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddUser;