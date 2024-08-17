import toast from "react-hot-toast";
import Icons from "@/components/Icons";
import { useState } from "react";
import PageLoading from "@/components/Spinners/PageLoading";

const Modal = ({ openModal, setOpenModal }) => {
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        try {
            setLoading(true);
            const res = await adminDeleteUser(id);
            res?.success && (
                toast.success(res.success, {
                    duration: 4000,
                    style: { borderRadius: '8px', background: '#151c48', color: '#fff', maxWidth: '600px', }
                }),
                setOpenModal(null)
            )
        } catch (error) {
            const err = error?.response?.data?.error
            err && toast.error(err, {
                style: {
                    borderRadius: '8px',
                    background: '#151c48',
                    color: '#fff',
                }
            });
        } finally {
            setLoading(false)
        }
    };

    return (<>
        <div className="fixed inset-0 z-50 bg-black/60 grid place-items-center"
        >
            <div className="absolute inset-0 z-0" onClick={() => setOpenModal(null)} />
            <ul className="relative z-50 max-w-sm w-full h-auto bg-white text-gray-600 shadow-lg border p-5 rounded-md list-none">
                <li className="w-full px-5 py-2 rounded hover:bg-gray-100 duration-300 cursor-pointer flex items-center gap-3">
                    <Icons icon="fluent:edit-16-regular" width="20" /> Edit Profile
                </li>
                <li className="w-full px-5 py-2 rounded hover:bg-gray-100 duration-300 cursor-pointer flex items-center gap-3">
                    <Icons icon="ri:file-list-3-line" width="20" /> Blogs
                </li>
                <li className="w-full px-5 py-2 rounded hover:bg-gray-100 duration-300 cursor-pointer flex items-center gap-3">
                    <Icons icon="solar:user-block-linear" width="20" /> Block
                </li>
                <li className="w-full px-5 py-2 rounded hover:bg-gray-100 duration-300 cursor-pointer flex items-center gap-3">
                    <Icons icon="mdi:shield-unlocked-outline" width="20" /> Active
                </li>
                <li
                    onClick={handleDelete}
                    className="w-full px-5 py-2 rounded hover:bg-gray-100 duration-300 cursor-pointer flex items-center gap-3"
                >
                    <Icons icon="lucide:trash-2" width="20" /> Delete
                </li>
            </ul>

        </div>
        {loading && <PageLoading fixed={true}/>}
    </>);
};

export default Modal;
