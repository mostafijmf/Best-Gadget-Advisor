"use client";
import JoditEditor from 'jodit-react';
import React, { useRef } from 'react';

const TextEditor = ({content, setContent}) => {
    const editor = useRef(null);

    const config = {
        readonly: false, // all options from https://xdsoft.net/jodit/doc/,
        placeholder: 'Start typings...'
    };

    return (
        <div>
            <JoditEditor
                ref={editor}
                value={content}
                config={config}
                tabIndex={1} // tabIndex of textarea
                onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                onChange={(newContent) => { }}
            />
        </div>
    );
};

export default TextEditor;