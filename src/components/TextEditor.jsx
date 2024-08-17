"use client";
import { useRef, useState } from 'react';
import { Icon } from '@iconify/react';
import dynamic from 'next/dynamic';
const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });

const TextEditor = ({ content, setContent, error = '' }) => {
    const editor = useRef(null);
    const [isPreview, setIsPreview] = useState(false);

    const config = {
        // readonly: false, // all options from https://xdsoft.net/jodit/doc/,
        placeholder: 'Start typings...',
    };


    return (<>
        <div>
            <JoditEditor
                ref={editor}
                value={content.content}
                config={config}
                tabIndex={1} // tabIndex of textarea
                onBlur={(newContent) => setContent({ ...content, content: newContent })} // preferred to use only this option to update the content for performance reasons
                onChange={(newContent) => { }}
            />
        </div>
        <div className='flex justify-between items-start'>
            <div>
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
            <div className='w-max mt-1'>
                <span
                    onClick={() => setIsPreview(true)}
                    className='bg-gray-300 hover:text-black hover:shadow duration-200 px-5 py-1 rounded inline-block cursor-pointer'
                >
                    Preview
                </span>
            </div>
        </div>
        {
            isPreview &&
            <div className='fixed inset-0 z-50 bg-gray-50 flex justify-center overflow-y-auto'>
                <div
                    className='absolute top-5 right-5 w-max hover:bg-gray-300 duration-200 rounded-full p-1 cursor-pointer'
                    onClick={() => setIsPreview(false)}
                >
                    <Icon icon="line-md:close" width="24" />
                </div>
                <section className=''>
                    <div className='container bg-white pb-20'>
                        <div className='max-w-2xl mx-auto py-10'>
                            <p className='text-base' dangerouslySetInnerHTML={{ __html: content.content }} />
                        </div>
                    </div>
                </section >
            </div >
        }
    </>);
};

export default TextEditor;