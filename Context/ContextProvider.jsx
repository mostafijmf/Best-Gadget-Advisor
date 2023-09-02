"use client";
import { createContext, useEffect, useState } from "react";

export const contextProvider = createContext();

const ContextProvider = ({ children }) => {
    const [blogDetails, setBlogDetails] = useState(null);
    const [blogEditForm, setBlogEditForm] = useState(null);

    return (
        <contextProvider.Provider
            value={{
                blogDetails,
                setBlogDetails,
                blogEditForm,
                setBlogEditForm
            }}
        >
            {children}
        </contextProvider.Provider>
    );
};

export default ContextProvider;