'use client';
import { useEffect, useState } from 'react';
import { getAuthUser } from '@/libs/apiServices';
import toast from 'react-hot-toast';

const useGetAuthUser = () => {
    const [authUser, setAuthUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // <!-- Fetch blog data -->
    useEffect(() => {
        getAuthUser()
            .then(res => setAuthUser(res))
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

    return [authUser, loading];
};

export default useGetAuthUser;