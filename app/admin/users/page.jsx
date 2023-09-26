'use client';
import { useState } from "react";
import dayjs from "dayjs";
import AddUser from "./AddUser";
import Icons from "@/components/Icons";
import PageLoading from "@/components/Spinners/PageLoading";
import ResultNotFound from "@/components/ResultNotFound";
import useGetAdminAllUsers from "@/hooks/useApi/useGetAdminAllUsers";
import Modal from "./Modal";

const ManageUsers = () => {
    const [users, loading] = useGetAdminAllUsers();
    const [addUser, setAddUser] = useState(false);
    const [openModal, setOpenModal] = useState(false);


    return (<>
        <section className='py-5'>
            <div className="w-full pb-5">
                <h1 className="text-3xl font-semibold text-primary text-center">Manage Users</h1>
            </div>
            <div className='flex items-center justify-end'>
                <button
                    onClick={() => setAddUser(true)}
                    className='btn text-sm border uppercase border-primary bg-white mx-0 hover:shadow-lg flex items-center gap-x-2'
                >
                    <Icons icon="ic:sharp-person-add" width="22" />
                    <b>Add user</b>
                </button>
            </div>
        </section>
        <section>
            {loading ? <PageLoading /> :
                users === 0 ? <ResultNotFound /> :
                    <div className="overflow-x-auto bg-white text-primary text-base rounded-lg border border-primary">
                        <table className="table-auto w-full">
                            <thead className="bg-violet-50 text-left border-b border-primary">
                                <tr>
                                    <th className="py-3 px-5">
                                        <h2 className='w-max'>Name</h2>
                                    </th>
                                    <th className="py-3 pr-5">
                                        <h2 className='w-max'>Email</h2>
                                    </th>
                                    <th className="py-3 pr-5">
                                        <h2 className='w-max'>Role</h2>
                                    </th>
                                    <th className="py-3 pr-5">
                                        <h2 className='w-max'>Created at</h2>
                                    </th>
                                    <th className="py-3 pr-5">
                                        <h2 className='w-max'>Status</h2>
                                    </th>
                                    <th className="py-3 pr-5">
                                    </th>
                                </tr>
                            </thead>
                            <tbody >
                                {
                                    users?.map(user =>
                                        <tr key={user._id} className={`border-primary ${user === users[users.length - 1] ? 'border-none' : 'border-b'}`}>
                                            <td className='py-3 px-5'>
                                                <div className="w-max font-medium capitalize">
                                                    {user.name}
                                                </div>
                                            </td>
                                            <td className='py-3 pr-5 text-sm'>
                                                <div className="w-max">
                                                    {user.email}
                                                </div>
                                            </td>
                                            <td className='py-3 pr-5'>
                                                <div className="w-max capitalize text-sm">
                                                    {user.role}
                                                </div>
                                            </td>
                                            <td className='py-3 pr-5'>
                                                <div className="w-max capitalize text-sm">
                                                    {dayjs(user.createdAt).format("DD-MMM-YYYY")}
                                                </div>
                                            </td>
                                            <td className='py-3 pr-5'>
                                                <div className="w-max capitalize text-sm">
                                                    {user.status === 'active' ?
                                                        <p className="py-0.5 px-2 rounded flex items-center gap-x-1">
                                                            <div className="w-2 h-2 rounded-full bg-[#2F9A48]" />
                                                            {user.status}
                                                        </p> :
                                                        <p className="py-0.5 px-2 rounded flex items-center gap-x-1">
                                                            <div className="w-2 h-2 rounded-full bg-red-500" />
                                                            {user.status}
                                                        </p>
                                                    }
                                                </div>
                                            </td>
                                            <td className='py-3 pr-5'>
                                                <div className="inline-block">
                                                    <button
                                                        onClick={() => setOpenModal(true)}
                                                        className="w-max hover:bg-gray-200 duration-300 rounded-full p-1.5"
                                                    >
                                                        <Icons icon="bi:three-dots-vertical" width={20} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
            }
        </section>
        {
            openModal && <Modal openModal={openModal} setOpenModal={setOpenModal} />
        }
        {
            addUser && <AddUser addUser={addUser} setAddUser={setAddUser} />
        }
    </>);
};

export default ManageUsers;