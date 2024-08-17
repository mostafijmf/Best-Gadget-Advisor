import axios from "axios";
import { notFound } from "next/navigation";
const url = process.env.NEXT_PUBLIC_BASE_URL || "";

export const getAuthUser = async () => {
    const res = await axios.get(`${url}/api/auth-user`);
    return res.data;
};

export const updateUserInfo = async (data, otp = "") => {
    const res = await axios.patch(`${url}/api/auth-user?otp=${otp}`, data);
    return res.data;
};

// <!-- Get All Blogs -->
export const getBlogs = async (query, page = 1, size = 20) => {
    const res = await fetch(`${url}/api/blogs?query=${query}&page=${page}&size=${size}`, { cache: "no-store" });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);

    return data;
};

// <!-- Get Search Blogs -->
export const getSearchBlogs = async (query) => {
    const res = await axios.get(`${url}/api/search-blogs?query=${query}`);
    return res.data;
};

// <!-- Get Blog By PathName -->
export const getBlogByPathName = async (pathName) => {
    const res = await fetch(`${url}/api/blogs/${pathName}`, { cache: "no-store" });
    const data = await res.json();
    if (!res.ok) return notFound();

    return data;
};

// <!-- Post leave a reply -->
export const leaveAReply = async (data) => {
    const res = await axios.post(`${url}/api/leave-a-reply`, data);
    return res.data;
};

// <== Admin API Start ==>
export const adminAddUser = async (data) => {
    const res = await axios.post(`${url}/api/admin/users`, data);
    return res.data;
};
export const adminDeleteUser = async (id) => {
    const res = await axios.delete(`${url}/api/admin/users/${id}`);
    return res.data;
};
export const activateUser = async (data) => {
    const res = await axios.put(`${url}/api/active-link`, data);
    return res.data;
};
export const getAllUsers = async (data) => {
    const res = await axios.get(`${url}/api/admin/users`, data);
    return res.data;
};

export const loginAdmin = async (data) => {
    const res = await axios.post(`${url}/api/admin/login`, data);
    return res.data;
};

// <!-- Admin Blogs API Start -->
export const createBlog = async (data) => {
    const res = await axios.post(`${url}/api/admin/blogs`, data);
    return res.data;
};

export const getAdminBlogs = async () => {
    const res = await axios.get(`${url}/api/admin/blogs`);
    return res.data;
};

export const getBlogById = async (id) => {
    const res = await axios.get(`${url}/api/admin/blogs/${id}`);
    return res.data;
};

export const updateBlog = async (id, data) => {
    const res = await axios.patch(`${url}/api/admin/blogs/${id}`, data);
    return res.data;
};

export const updateBlogStatus = async (data) => {
    const res = await axios.patch(`${url}/api/admin/blogs`, data);
    return res.data;
};

export const deleteBlogById = async (id) => {
    const res = await axios.delete(`${url}/api/admin/blogs/${id}`);
    return res.data;
};

export const getBlogPathName = async (query) => {
    const res = await axios.get(`${url}/api/admin/blogs/path-name?query=${query}`);
    return res.data;
};
// <!-- Admin Blogs API End -->
// <== Admin API End ==>

// <!-- Logout -->
export const logout = async () => {
    const res = await axios.post(`${url}/api/logout`);
    return res.data;
};
