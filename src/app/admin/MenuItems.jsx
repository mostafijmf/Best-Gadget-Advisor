"use client";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Icon } from "@iconify/react";
import Link from "next/link";
import PageLoading from "@/components/Spinners/PageLoading";
import { logout } from "@/libs/apiServices";

const MenuItems = ({ user }) => {
    const [openSidebar, setOpenSidebar] = useState(true);
    const [loading, setLoading] = useState(false);
    const currentPath = usePathname();
    const router = useRouter();

    const itemsStyle = 'w-full h-auto py-3 px-5 text-base hover:bg-[#0c102a] duration-300 relative rounded flex items-center gap-3';
    const itemsTextStyle = (openSidebar ? 'scale-100' : 'scale-0') + ' whitespace-nowrap origin-left duration-300';


    // <!-- Logout -->
    const handleLogout = async () => {
        try {
            setLoading(true);
            const res = await logout();
            res?.logout && router.push('/login');
        } catch (error) {
            const err = error?.response?.data?.error
            err && toast.error(err, {
                style: {
                    borderRadius: '8px',
                    background: '#151c48',
                    color: '#fff',
                }
            });
        }
        finally { setLoading(false) };
    };

    return (<>
        <div className={`lg:hidden ${openSidebar ? 'w-[60px]' : 'hidden'}`} />
        <aside className={`sticky top-0 left-0 h-full bg-primary ${openSidebar ? 'w-72 p-6 max-lg:fixed z-50' : 'w-[60px]'} duration-300`}>

            {/* <!-- Hamburger Btn --> */}
            <div className={`absolute top-4 ${openSidebar ? 'right-4' : 'right-0 w-full grid place-items-center'}`}>
                <button className={openSidebar && 'hamburger-opened'} onClick={() => setOpenSidebar(!openSidebar)}>
                    <svg width="40" height="40" viewBox="0 0 100 100">
                        <path className="hamburger-line hamburger-line1" d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058" />
                        <path className="hamburger-line hamburger-line2" d="M 20,50 H 80" />
                        <path className="hamburger-line hamburger-line3" d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942" />
                    </svg>
                </button>

            </div>

            {/* <!-- Menu Items --> */}
            <ul className='list-none h-screen max-h-full overflow-y-auto text-gray-200 '>
                <li className='py-6 border-b mb-4'>
                    <h1 className={`text-center text-2xl font-medium ${itemsTextStyle}`}>Admin</h1>
                </li>
                <li>
                    <Link
                        href='/admin'
                        className={`${itemsStyle} ${currentPath === '/admin' && 'bg-[#060a20]'}`}
                    >
                        <span><Icon icon="uil:create-dashboard" width="20" /></span>
                        <span className={itemsTextStyle}>Dashboard</span>
                    </Link>
                </li>
                <li>
                    <Link
                        href='/admin/create-blog'
                        className={`${itemsStyle} ${currentPath === '/admin/create-blog' && 'bg-[#060a20]'}`}
                    >
                        <span><Icon icon="lucide:pen-square" width="20" /></span>
                        <span className={itemsTextStyle}>Create Blog</span>
                    </Link>
                </li>
                <li>
                    <Link
                        href='/admin/all-blogs'
                        className={`${itemsStyle} ${currentPath === '/admin/all-blogs' && 'bg-[#060a20]'}`}
                    >
                        <span><Icon icon="ri:file-list-3-line" width="20" /></span>
                        <span className={itemsTextStyle}>All Blogs</span>
                    </Link>
                </li>
                {
                    user === 'admin' &&
                    <li>
                        <Link
                            href='/admin/users'
                            className={`${itemsStyle} ${currentPath === '/admin/users' && 'bg-[#060a20]'}`}
                        >
                            <span><Icon icon="lucide:users" width="20" /></span>
                            <span className={itemsTextStyle}>Manage Users</span>
                        </Link>
                    </li>
                }
                <li>
                    <Link
                        href='/admin/settings'
                        className={`${itemsStyle} ${currentPath === '/admin/settings' && 'bg-[#060a20]'}`}
                    >
                        <span><Icon icon="ep:setting" width="20" /></span>
                        <span className={itemsTextStyle}>Settings</span>
                    </Link>
                </li>
                <li>
                    <button
                        onClick={() => handleLogout()}
                        className={`${itemsStyle}`}
                    >
                        <span><Icon icon="ic:baseline-logout" width="20" /></span>
                        <span className={itemsTextStyle}>Logout</span>
                    </button>
                </li>
            </ul>
        </aside>
        {loading && <PageLoading fixed={true} />}
    </>
    );
};

export default MenuItems;