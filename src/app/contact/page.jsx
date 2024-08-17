import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
    title: "Contact Us",
    description: "We welcome your questions, feedback, and inquiries. Please feel free to contact us.",
};

const page = () => {
    return (<>
        <Navbar />
        <section className="py-24 border-b">
            <div className="container">
                <h1 className='text-center lg:text-6xl md:text-5xl text-4xl font-bold text-primary tracking-tight'>
                    Contact
                </h1>
            </div>
        </section>
        <section className="container max-w-6xl mx-auto pt-8 pb-32">
            <div className="text-center">
                <h2 className="text-2xl font-semibold text-gray-600">
                    Get In Touch
                </h2>
                <p className="text-lg text-gray-500">
                    We welcome your questions, feedback, and inquiries. <br /> Please feel free to contact us.
                </p>
            </div>
            <div className='mt-10 grid md:grid-cols-3 grid-cols-1 md:w-full sm:w-4/5 w-full mx-auto gap-6'>
                <div className='border rounded p-7'>
                    <svg
                        className='w-14 h-14 mx-auto p-3 rounded-full bg-gradient-to-r from-secondary to-primary text-white'
                        viewBox="0 0 24 24">
                        <path fill="currentColor" d="M15,12H17A5,5 0 0,0 12,7V9A3,3 0 0,1 15,12M19,12H21C21,7 16.97,3 12,3V5C15.86,5 19,8.13 19,12M20,15.5C18.75,15.5 17.55,15.3 16.43,14.93C16.08,14.82 15.69,14.9 15.41,15.18L13.21,17.38C10.38,15.94 8.06,13.62 6.62,10.79L8.82,8.59C9.1,8.31 9.18,7.92 9.07,7.57C8.7,6.45 8.5,5.25 8.5,4A1,1 0 0,0 7.5,3H4A1,1 0 0,0 3,4A17,17 0 0,0 20,21A1,1 0 0,0 21,20V16.5A1,1 0 0,0 20,15.5Z" />
                    </svg>
                    <p className='text-center text-lg font-medium mt-5 text-gray-600'>
                        Have questions? Call Us.
                    </p>
                    <p className='text-center text-base mt-3 text-gray-500'>
                        <a href='tel:+8801613-788641'>
                            +8801613-788641
                        </a>
                    </p>
                </div>
                <div className='border rounded p-7'>
                    <svg
                        className='w-14 h-14 mx-auto p-3 rounded-full bg-gradient-to-r from-secondary to-primary text-white'
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none" viewBox="0 0 24 24"
                        stroke="currentColor" strokeWidth={2}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <p className='text-center text-lg font-medium mt-5 text-gray-600'>
                        Email Us
                    </p>
                    <p className='text-center text-base mt-3 text-gray-500'>
                        <a href='mailto:mostafijmf@gmail.com'>
                            mostafijmf@gmail.com
                        </a>
                    </p>
                </div>
                <div className='border rounded p-7'>
                    <svg
                        className='w-14 h-14 mx-auto p-3 rounded-full bg-gradient-to-r from-secondary to-primary text-white'
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                    <p className='text-center text-lg font-medium mt-5 text-gray-600'>
                        Address
                    </p>
                    <p className='text-center text-base mt-3 text-gray-500'>
                        Cheora, Chouddagram, Cumilla, Bangladesh
                    </p>
                </div>
            </div>
        </section>
        <Footer />
    </>);
};

export default page;