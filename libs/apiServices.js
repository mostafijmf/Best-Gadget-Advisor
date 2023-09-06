import axios from "axios";
import { notFound } from "next/navigation";
const url = process.env.CLIENT_URL;

export const getUser = async () => {
    const res = await axios.get(`/api/get-user`);
    return res.data;
};

// <!-- Get All Blogs -->
export const getBlogs = async (query, page = 1, size = 10) => {
    const res = await fetch(`${url}/api/blogs?query=${query}&page=${page}&size=${size}`, {
        cache: 'no-store',
        next: {
            revalidate: 3
        }
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error);

    return data
};

// <!-- Get Search Blogs -->
export const getSearchBlogs = async (query) => {
    const res = await axios.get(`/api/search-blogs?query=${query}`);
    return res.data;
};

// <!-- Get Blog By PathName -->
export const getBlogByPathName = async (pathName) => {
    const res = await fetch(`${url}/api/blogs/${pathName}`, {
        cache: 'no-store',
        // next: {
        //     revalidate: 3
        // }
    });

    const data = await res.json();
    if (!res.ok) return notFound();

    return data
};


// <!-- Post leave a reply -->
export const leaveAReply = async (data) => {
    const res = await axios.post(`/api/leave-a-reply`, data);
    return res.data;
};





// <== Admin API Start ==>
export const loginAdmin = async (data) => {
    const res = await axios.post(`/api/admin/login`, data);
    return res.data;
};

// <!-- Admin Blogs API Start -->
export const createBlog = async (data) => {
    const res = await axios.post(`/api/admin/blogs`, data);
    return res.data;
};

export const getAdminBlogs = async () => {
    const res = await axios.get(`/api/admin/blogs`);
    return res.data;
};

export const getBlogById = async (id) => {
    const res = await axios.get(`/api/admin/blogs/${id}`);
    return res.data;
};

export const updateBlog = async (id, data) => {
    const res = await axios.patch(`/api/admin/blogs/${id}`, data);
    return res.data;
};

export const updateBlogStatus = async (data) => {
    const res = await axios.patch(`/api/admin/blogs`, data);
    return res.data;
};

export const deleteBlogById = async (id) => {
    const res = await axios.delete(`/api/admin/blogs/${id}`);
    return res.data;
};

export const getBlogPathName = async (query) => {
    const res = await axios.get(`/api/admin/blogs/path-name?query=${query}`);
    return res.data;
};
// <!-- Admin Blogs API End -->
// <== Admin API End ==>


// <!-- Logout -->
export const logout = async () => {
    const res = await axios.post(`/api/logout`);
    return res.data
};