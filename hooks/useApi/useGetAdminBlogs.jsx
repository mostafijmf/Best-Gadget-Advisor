'use client';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { getAdminBlogs } from '@/libs/apiServices';

const useGetAdminBlogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        getAdminBlogs()
            .then(res => setBlogs(res))
            .catch(error => {
                const err = error?.response?.data?.error
                err && toast.error(err, {
                    style: { borderRadius: '8px', background: '#151c48', color: '#fff', maxWidth: '600px', }
                });
            })
            .finally(() => { setLoading(false) })
    }, [blogs]);

    return [blogs, loading];
};

export default useGetAdminBlogs;