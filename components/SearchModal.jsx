import { Icon } from '@iconify/react';
import React from 'react';

const SearchModal = ({ setOpenSearchModal }) => {
    return (
        <div className='fixed inset-0 z-50 overflow-y-auto bg-black/60'>
            <div className='absolute inset-0 z-0' onClick={() => setOpenSearchModal(false)} />
            
            <section className='relative z-10 max-w-2xl mx-auto bg-white py-5 px-6 border border-primary rounded-lg'>
                <div className='w-full h-10 rounded-md border flex items-center gap-x-2 px-2 cursor-text'>
                    <label htmlFor='search'>
                        <Icon icon="ooui:search" width="20" />
                    </label>
                    <input
                        type="text"
                        name="search"
                        id="search"
                        placeholder='Search...'
                        className='w-full h-full outline-none bg-transparent'
                    />
                </div>
            </section>
        </div>
    );
};

export default SearchModal;