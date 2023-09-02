"use client";
import Sidebar from './Sidebar';
import './style.css';

const DashboardLayout = ({ children }) => {

    return (
        <main className='flex items-start gap-5 2xl:container'>
            <Sidebar />
            <div className='w-[calc(100%-288px)] mx-auto h-full'>
                {children}
            </div>
        </main>
    );
};

export default DashboardLayout;