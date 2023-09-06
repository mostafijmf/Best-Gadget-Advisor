'use client';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import logo from '/public/images/logo/bga-logo.png';
import Responsive from './Responsive';
import { Icon } from '@iconify/react';
import SearchModal from '../SearchModal';

const Navbar = () => {
    const [scroll, setScroll] = useState(false);
    const [openMenu, setOpenMenu] = useState(false);
    const [openSearchModal, setOpenSearchModal] = useState(false);
    const currentPath = usePathname();

    // <!-- Navbar Scroll Effect -->
    useEffect(() => {
        window.addEventListener('scroll', () => {
            let scrollTop = window.scrollY || document.documentElement.scrollTop;
            if (scrollTop > 48) {
                setScroll(true);
            }
            else {
                setScroll(false);
            }
        });
    }, []);


    return (<>
        <nav className='w-full h-[72px] bg-transparent'>
            <div className={`w-full max-h-full fixed top-0 left-0 ${scroll ? 'border-b border-gray-200 bg-white/50 backdrop-blur-xl' : 'bg-transparent'} z-30 transition-all`}>
                <div className='container flex justify-between items-center'>
                    <Link href='/'>
                        <Image
                            src={logo}
                            alt="BGA Logo"
                            className='max-md:h-16 max-md:w-auto'
                            width={0}
                            height={72}
                        />
                    </Link>
                    <ul className='flex justify-between gap-8 list-none text-primary text-lg max-lg:hidden'>
                        <li>
                            <Link
                                href={'/'}
                                className={`hover:text-secondary duration-200 hover:border-b border-secondary ${currentPath === '/' && 'text-secondary border-b'}`}
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                href={'/product-reviews'}
                                className={`hover:text-secondary duration-200 hover:border-b border-secondary ${currentPath === '/product-reviews' && 'text-secondary border-b'}`}
                            >
                                Product Reviews
                            </Link>
                        </li>
                        <li>
                            <Link
                                href={'/contact'}
                                className={`hover:text-secondary duration-200 hover:border-b border-secondary ${currentPath === '/contact' && 'text-secondary border-b'}`}
                            >
                                Contact
                            </Link>
                        </li>
                        <li>
                            <Link
                                href={'/about'}
                                className={`hover:text-secondary duration-200 hover:border-b border-secondary ${currentPath === '/about' && 'text-secondary border-b'}`}
                            >
                                About
                            </Link>
                        </li>
                        <li className='grid place-content-center'>
                            <button
                                onClick={() => setOpenSearchModal(!openSearchModal)}
                                className={`hover:text-secondary duration-200`}
                            >
                                <Icon icon="ooui:search" width="20" />
                            </button>
                        </li>
                    </ul>

                    {/* <!-- Responsive Menu --> */}
                    <Responsive
                        openMenu={openMenu}
                        setOpenMenu={setOpenMenu}
                        openSearchModal={openSearchModal}
                        setOpenSearchModal={setOpenSearchModal}
                    />
                </div>
            </div>
        </nav>
        {
            openSearchModal &&
            <SearchModal setOpenSearchModal={setOpenSearchModal} />
        }
    </>);
};

export default Navbar;