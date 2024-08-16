import Sidebar from './Sidebar';
import './style.css';

export const metadata = {
    title: 'Admin Dashboard',
    robots: {
        index: false,
        nocache: true,
    },
};
 
const DashboardLayout = ({ children }) => {

    return (
        <div className='w-full h-full bg_gradient'>
            <main className='w-full flex items-start lg:gap-5 2xl:container'>
                <Sidebar />
                <div className='lg:w-[calc(100%-288px)] lg:mx-auto w-[calc(100%-60px)] max-lg:px-2 lg:pr-5 h-full'>
                    {children}
                </div>
            </main>
        </div>
    );
};

export default DashboardLayout;