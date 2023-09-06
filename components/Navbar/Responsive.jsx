import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@iconify/react";

const Responsive = ({ openMenu, setOpenMenu, openSearchModal, setOpenSearchModal }) => {
    const currentPath = usePathname();


    return (<>
        <div className='lg:hidden min-w-min grid place-items-center relative'>

            {/* <!-- Hamburger Btn --> */}
            <button className={`${openMenu && 'hamburger-opened'}`} onClick={() => setOpenMenu(!openMenu)}>
                <svg width="40" height="40" viewBox="0 0 100 100">
                    <path style={{ stroke: '#151c48' }} className="hamburger-line hamburger-line1" d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058" />
                    <path style={{ stroke: '#151c48' }} className="hamburger-line hamburger-line2" d="M 20,50 H 80" />
                    <path style={{ stroke: '#151c48' }} className="hamburger-line hamburger-line3" d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942" />
                </svg>
            </button>

            <ul className={`absolute top-14 right-0 w-80 h-min bg-white flex flex-col list-none text-primary text-lg rounded-md overflow-hidden shadow-lg duration-300 origin-right ${openMenu ? 'scale-100 translate-x-0' : 'scale-x-0 translate-x-10'}`}>
                <li>
                    <Link
                        href={'/'}
                        className={`px-10 py-3 hover:bg-orange-50 w-full h-max block hover:text-secondary duration-200 ${currentPath === '/' && 'text-secondary bg-orange-50'}`}
                    >
                        Home
                    </Link>
                </li>
                <li>
                    <Link
                        href={'/product-reviews'}
                        className={`px-10 py-3 hover:bg-orange-50 w-full h-max block hover:text-secondary duration-200 ${currentPath === '/product-reviews' && 'text-secondary bg-orange-50'}`}
                    >
                        Product Reviews
                    </Link>
                </li>
                <li>
                    <Link
                        href={'/contact'}
                        className={`px-10 py-3 hover:bg-orange-50 w-full h-max block hover:text-secondary duration-200 ${currentPath === '/contact' && 'text-secondary bg-orange-50'}`}
                    >
                        Contact
                    </Link>
                </li>
                <li>
                    <Link
                        href={'/about'}
                        className={`px-10 py-3 hover:bg-orange-50 w-full h-max block hover:text-secondary duration-200 ${currentPath === '/about' && 'text-secondary bg-orange-50'}`}
                    >
                        About
                    </Link>
                </li>

                <li className=''>
                    <button
                        onClick={() => setOpenSearchModal(!openSearchModal)}
                        className={`px-10 py-3 hover:bg-orange-50 w-full h-max block hover:text-secondary duration-200 `}
                    >
                        <Icon icon="ooui:search" width="20" />
                    </button>
                </li>
            </ul>
        </div>
    </>);
};

export default Responsive;