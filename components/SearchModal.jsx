import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { Icon } from '@iconify/react';
import { getSearchBlogs } from '@/libs/apiServices';
import ResultNotFound from './ResultNotFound';
import Link from 'next/link';
import BtnLoading from './Spinners/BtnLoading';

const SearchModal = ({ setOpenSearchModal }) => {
    const [searchValue, setSearchValue] = useState('');
    const [blogs, setBlogs] = useState([]);
    const [noResult, setNoResult] = useState(null);
    const [loading, setLoading] = useState(false);

    // <!-- Fetch blogs -->
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (searchValue.trim() !== '') {
                setLoading(true);
                getSearchBlogs(searchValue)
                    .then(data => {
                        setBlogs(data?.blogs);
                        setNoResult(data?.noResult);
                    })
                    .catch(err => {
                        const error = err?.response?.data?.error
                        error && toast.error(error, {
                            style: { borderRadius: '8px', background: '#151c48', color: '#fff', maxWidth: '600px', }
                        })
                    })
                    .finally(() => setLoading(false))
            }
        }, 200);

        return () => clearTimeout(delayDebounceFn);
    }, [searchValue]);

    return (
        <div className='fixed inset-0 z-50 overflow-y-auto bg-black/60'>
            <div className='absolute inset-0 z-0' onClick={() => setOpenSearchModal(false)} />

            <section className='relative z-10 max-w-2xl mx-auto bg-white py-5 px-6 border border-primary rounded-lg'>
                <div className='w-full h-10 rounded-md border flex items-center gap-x-2 px-2 cursor-text'>
                    <label htmlFor='search'>
                        <Icon icon="ooui:search" width="20" className='text-gray-400' />
                    </label>
                    <input
                        type="text"
                        name="search"
                        id="search"
                        placeholder='Search...'
                        className='w-full h-full outline-none bg-transparent'
                        onChange={(e) => setSearchValue(e.target.value)}
                    />
                </div>
                <ul className='list-none flex flex-col gap-1 mt-5'> {
                    loading ?
                        <li><BtnLoading className="stroke-primary"/></li> :
                        noResult === true ?
                            <li><ResultNotFound /></li> :
                            blogs.map(blog =>
                                <li key={blog._id}>
                                    <Link href={blog.pathName} className='block text-lg text-primary hover:text-emerald-500 duration-300 py-1'>
                                        {blog.title}
                                    </Link>
                                </li>
                            )
                } </ul>
            </section>
        </div>
    );
};

export default SearchModal;