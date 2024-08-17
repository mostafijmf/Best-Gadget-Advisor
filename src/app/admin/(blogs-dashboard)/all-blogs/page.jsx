"use client";
import { useState } from "react";
import { toast } from "react-hot-toast";
import dayjs from "dayjs";
import Link from "next/link";
import InputForm from "@/components/InputForm";
import { deleteBlogById, updateBlogStatus } from "@/libs/apiServices";
import PageLoading from "@/components/Spinners/PageLoading";
import useGetAdminBlogs from "@/hooks/useApi/useGetAdminBlogs";
import ConfirmModal from "@/components/ConfirmModal";
import ResultNotFound from "@/components/ResultNotFound";

const AllBlogs = () => {
    const [blogs, loading] = useGetAdminBlogs();
    const [pageLoading, setPageLoading] = useState(false);
    const [isDelete, setIsDelete] = useState(null);

    // <!-- Update blog status -->
    const handleUpdateStatus = async (e, id) => {
        try {
            setPageLoading(true);
            const value = e.target.value;
            const res = await updateBlogStatus({ status: value, id });
            res &&
                toast.success("Status updated successfully.", {
                    duration: 4000,
                    style: { borderRadius: "8px", background: "#151c48", color: "#fff", maxWidth: "600px" },
                });
        } catch (error) {
            const err = error?.response?.data?.error;
            err &&
                toast.error(err, {
                    style: {
                        borderRadius: "8px",
                        background: "#151c48",
                        color: "#fff",
                    },
                });
        } finally {
            setPageLoading(false);
        }
    };

    // <!-- Delete blog by Id -->
    const handleDeleteBlog = async (id) => {
        try {
            setPageLoading(true);
            const res = await deleteBlogById(id);
            res?.success &&
                toast.success(res?.success, {
                    duration: 4000,
                    style: { borderRadius: "8px", background: "#151c48", color: "#fff", maxWidth: "600px" },
                });
            setIsDelete(null);
        } catch (error) {
            const err = error?.response?.data?.error;
            err &&
                toast.error(err, {
                    style: {
                        borderRadius: "8px",
                        background: "#151c48",
                        color: "#fff",
                    },
                });
        } finally {
            setPageLoading(false);
        }
    };

    return (
        <>
            {pageLoading && <PageLoading fixed={true} />}
            <div className="w-full py-5">
                <h1 className="text-3xl font-semibold text-primary text-center">All Blogs</h1>
                {loading ? (
                    <PageLoading />
                ) : blogs.length === 0 ? (
                    <ResultNotFound />
                ) : (
                    <div className="max-w-full my-5">
                        <div className="mb-5">
                            <InputForm placeholder="🔍 Search blog by title" className="bg-white/50 max-w-md" />
                        </div>
                        <div className="overflow-x-auto bg-white text-primary text-base rounded-lg border">
                            <table className="table-auto w-full">
                                <thead className="bg-violet-50 text-left">
                                    <tr>
                                        <th className="py-3 px-5">
                                            <h2 className="w-max">Title</h2>
                                        </th>
                                        <th className="py-3 pr-5">
                                            <h2 className="w-max">Created at</h2>
                                        </th>
                                        <th className="py-3 pr-5">
                                            <h2 className="w-max">Status</h2>
                                        </th>
                                        <th className="py-3 pr-5">
                                            <h2 className="w-max">Action</h2>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {blogs?.map((blog) => (
                                        <tr key={blog._id} className="border-b">
                                            <td className="py-3 px-5">
                                                <div className="w-96 font-medium">
                                                    <Link
                                                        href={{
                                                            pathname: "/admin/blog-details",
                                                            query: `id=${blog?._id}`,
                                                        }}
                                                        className="text-emerald-500 hover:text-emerald-600 duration-300"
                                                    >
                                                        {blog.title}
                                                    </Link>
                                                </div>
                                            </td>
                                            <td className="py-3 pr-5">
                                                <div className="w-max capitalize">
                                                    {dayjs(blog.createdAt).format("DD-MMM-YYYY")}
                                                </div>
                                            </td>
                                            <td className="py-3 pr-5">
                                                <select
                                                    name="status"
                                                    id="status"
                                                    defaultValue={blog.status}
                                                    className="btn-sm border-secondary outline-none hover:shadow-[0_2px_6px_3px_rgb(0,0,0,0.1)]"
                                                    onChange={(e) => handleUpdateStatus(e, blog?._id)}
                                                >
                                                    <option value="active">Active</option>
                                                    <option value="inactive">Inactive</option>
                                                </select>
                                            </td>
                                            <td className="py-3 pr-5">
                                                <div className="w-max capitalize flex items-center gap-3">
                                                    <Link
                                                        href={{
                                                            pathname: "/admin/blog-details",
                                                            query: `id=${blog?._id}`,
                                                        }}
                                                        className="btn-sm btn-primary hover:shadow-[0_2px_6px_3px_rgb(0,0,0,0.1)]"
                                                    >
                                                        View
                                                    </Link>
                                                    <Link
                                                        href={{
                                                            pathname: "/admin/blog-edit",
                                                            query: `id=${blog?._id}`,
                                                        }}
                                                        className="btn-sm bg-gray-100  border-gray-500 hover:bg-gray-200"
                                                    >
                                                        Edit
                                                    </Link>
                                                    <button
                                                        onClick={() => setIsDelete(blog?._id)}
                                                        className="btn-sm bg-red-100 border-red-500 hover:bg-red-200"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
            {isDelete && (
                <ConfirmModal handleConfirm={handleDeleteBlog} isDelete={isDelete} setIsDelete={setIsDelete} />
            )}
        </>
    );
};

export default AllBlogs;
