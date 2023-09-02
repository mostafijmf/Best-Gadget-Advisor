import { Icon } from '@iconify/react';
import React from 'react';

const Textarea = ({ onChange, name, label, placeholder, defaultValue, className, error }) => {
    return (
        <div className='w-full text-base'>
            <label htmlFor={name} className='block w-full font-medium mb-0.5'>
                {label} <sub className='text-sm text-gray-500'>(max 200 characters)</sub>
            </label>
            <textarea
                name={name}
                id={name}
                cols="" rows="3" maxLength={200}
                onChange={onChange}
                placeholder={placeholder}
                defaultValue={defaultValue}
                className={`w-full h-auto border rounded-md outline-none px-3 py-2 text-gray-600 focus:border-gray-500 ${className} ${error && 'border-red-500'}`}
            />
            {
                error &&
                <p className='relative top-0 mt-1 text-sm text-red-500 flex gap-2 items-start'>
                    <div className="block w-max pt-0.5">
                        <Icon icon="pajamas:warning-solid" width="16" />
                    </div>
                    {error}
                </p>
            }
        </div>
    );
};

export default Textarea;