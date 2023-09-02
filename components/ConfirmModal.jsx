import { Icon } from "@iconify/react";

const ConfirmModal = ({ handleConfirm, isDelete, setIsDelete }) => {
    return (
        <div className="fixed inset-0 bg-black/60 overflow-y-auto grid place-items-center">

            <div className="relative max-w-md px-10 py-8 text-center bg-white rounded-lg shadow dark:bg-gray-800">
                <button
                    type="button"
                    onClick={() => setIsDelete(null)}
                    className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-primary rounded-full duration-200 p-1.5"
                >
                    <Icon icon="line-md:close" width="24" />
                </button>
                <div className="flex justify-center text-gray-500">
                    <Icon icon="mdi-light:delete" width="40" />
                </div>
                <div className="text-lg text-gray-500 pb-6 pt-5">
                    <p>Are you sure you want to delete this blog?</p>
                </div>
                <div className="flex justify-center items-center gap-5">
                    <button
                        type="button"
                        onClick={() => setIsDelete(null)}
                        className="btn-sm text-sm mx-0 text-gray-500 bg-white border-gray-200 hover:bg-gray-100 py-2"
                    >
                        No, cancel
                    </button>
                    <button
                        type="submit"
                        onClick={() => handleConfirm(isDelete)}
                        className="btn-sm text-sm mx-0 bg-red-600 hover:bg-red-700 text-white py-2"
                    >
                        Yes, I&apos;m sure
                    </button>
                </div>
            </div>

        </div>
    );
};

export default ConfirmModal;