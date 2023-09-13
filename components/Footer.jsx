import Link from "next/link";

const Footer = () => {
    return (
        <footer className='w-full bg-gray-300/10 border-t border-gray-200'>
            <div className='container pt-10 text-gray-600'>
                <div className="max-w-xl mx-auto">
                    <h4 className="text-2xl font-medium mb-5 text-center">Disclaimer</h4>
                    <p className="flex flex-col gap-2 text-base tracking-wide">
                        <span>
                            At Review Holder, we strive to provide honest and valuable reviews of various gadgets and products to assist you in making informed purchasing decisions.
                        </span>
                        <span>
                            To remain transparent, we want you to know that some of the links on our website are affiliate links, which means that we may earn a commission if you make a purchase through those links. This helps support our website&apos;s maintenance and high-quality content delivery.
                        </span>
                    </p>
                </div>
                <ul className="list-none flex items-center justify-center md:gap-10 gap-8 mt-10 font-semibold">
                    <li>
                        <Link href='/about' className="hover:underline">About</Link>
                    </li>
                    <li>
                        <Link href='/contact' className="hover:underline">Contact</Link>
                    </li>
                    <li>
                        <Link href='/privacy-and-policy' className="hover:underline">Privacy And Policy</Link>
                    </li>
                </ul>
            </div>

            <div className='container py-5 text-center'>
                <p className='text-base text-gray-600'>
                    Copyright &copy; {new Date().getFullYear()} Review Holder, All Rights Reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;