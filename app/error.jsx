'use client';
import { useEffect } from 'react';
import ErrorComponent from '@/components/ErrorComponent';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer';

const Error = ({ error, reset }) => {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error({ error }) 
    }, [error]);

    return (<>
        <Navbar />
        <ErrorComponent error={error} reset={reset} />
        <Footer />
    </>)
};

export default Error;