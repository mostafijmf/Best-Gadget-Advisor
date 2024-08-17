'use client';
import Icons from "@/components/Icons";
import PageLoading from "@/components/Spinners/PageLoading";
import useGetAuthUser from "@/hooks/useApi/useGetAuthUser";
import dayjs from "dayjs";
import { useState } from "react";
import EditForm from "./EditForm";

const Settings = () => {
    const [authUser, loading] = useGetAuthUser();
    const [openEdit, setOpenEdit] = useState(false);

    return (<>
        <div className="w-full py-10 text-primary text-base">
            <div>
                <h1 className="text-3xl font-semibold text-center">Account Information</h1>
            </div>
            {
                loading ? <PageLoading /> :
                    <div className="max-w-2xl w-full mx-auto mt-10">
                        <section className="bg-white rounded-md border border-primary p-8 relative">
                            <button
                                onClick={() => setOpenEdit(true)}
                                className="absolute top-5 right-5 text-sm text-blue-600 hover:bg-gray-100 duration-300 px-2 py-1 rounded flex items-center gap-1"
                            >
                                <Icons icon="fluent:edit-12-regular" width="16" />
                                Edit
                            </button>
                            <ul className="list-none flex flex-col gap-5">
                                <li className="flex items-center gap-20">
                                    <p className="text-gray-500">Name</p>
                                    <p>{authUser?.name || '--'}</p>
                                </li>
                                <li className="flex items-center gap-[83px]">
                                    <p className="text-gray-500">Email</p>
                                    <p>{authUser?.email || '--'}</p>
                                </li>
                                <li className="flex items-center gap-[83px]">
                                    <p className="text-gray-500">Since</p>
                                    <p className="text-sm">
                                        {authUser?.createdAt ?
                                            dayjs(authUser?.createdAt).format("DD MMM YYYY")
                                            : '--'
                                        }
                                    </p>
                                </li>
                            </ul>
                        </section>
                        <div className="w-full text-start mt-10">
                            <button className="text-blue-600 hover:underline flex items-center">
                                Change Password<Icons icon="ri:arrow-right-s-line" width="22" />
                            </button>
                        </div>
                    </div>
            }
        </div>
        {openEdit && <EditForm user={authUser} setOpenEdit={setOpenEdit} />}
    </>);
};

export default Settings;