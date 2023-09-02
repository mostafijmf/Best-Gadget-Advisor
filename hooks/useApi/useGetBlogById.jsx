import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { getBlogById } from '@/libs/apiServices';

const useGetBlogById = (id) => {
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);

    // <!-- Fetch blog data -->
    useEffect(() => {
        getBlogById(id)
            .then(res => setBlog(res))
            .catch(error => {
                const err = error?.response?.data?.error
                err && toast.error(err, {
                    style: {
                        borderRadius: '8px',
                        background: '#151c48',
                        color: '#fff',
                    }
                });
            })
            .finally(() => setLoading(false))
    }, []);

    return [blog, loading];
};

export default useGetBlogById;