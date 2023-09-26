'use client';
import { getAllUsers } from '@/libs/apiServices';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const useGetAdminAllUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            getAllUsers()
                .then(data => setUsers(data.payload))
                .catch(error => {
                    const err = error?.response?.data?.error
                    err && toast.error(err, {
                        style: {
                            borderRadius: '8px',
                            background: '#151c48',
                            color: '#fff',
                        }
                    })
                })
                .finally(() => setLoading(false))
        }, 200);

        return () => clearTimeout(delayDebounceFn);
    }, [users]);

    return [users, loading];
};

export default useGetAdminAllUsers;