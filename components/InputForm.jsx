'use client';
import { Icon } from '@iconify/react';

const InputForm = ({
    label,
    type,
    name,
    accept = '',
    onChange = '',
    placeholder = '',
    className = '',
    defaultValue = '',
    error
}) => {
    return (
        <div className='w-full text-base'>
            {
                type === 'file' ?
                    <>
                        <label
                            htmlFor={name}
                            className={`w-full h-11 bg-gray-100 border rounded-md outline-none px-3 text-gray-600 cursor-pointer grid items-center ${className} ${error ? 'border-red-500' : 'border-gray-300'}`}
                        >
                            {defaultValue?.name || label}
                            <input
                                type={type}
                                id={name}
                                name={name}
                                accept={accept}
                                onChange={onChange}
                                defaultValue={defaultValue}
                                className={`hidden`}
                            />
                        </label>
                    </>
                    :
                    <>
                        <label htmlFor={name} className='block w-full font-medium mb-0.5'>
                            {label}
                        </label>
                        <input
                            type={type}
                            id={name}
                            name={name}
                            onChange={onChange}
                            placeholder={placeholder}
                            defaultValue={defaultValue}
                            className={`w-full h-11 border rounded-md outline-none px-3 text-gray-600 focus:border-gray-500 ${className} ${error && 'border-red-500'}`}
                        />
                    </>
            }
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

export default InputForm;