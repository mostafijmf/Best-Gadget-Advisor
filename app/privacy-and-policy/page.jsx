import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
    title: "Privacy And Policy",
    description: "We value your privacy and are committed to protecting your personal information.",
};

const PrivacyAndPolicy = () => {
    return (<>
        <Navbar />
        <section className="py-24 border-b">
            <div className="container">
                <h1 className='text-center lg:text-6xl md:text-5xl text-4xl font-bold text-primary tracking-tight'>
                    Privacy And Policy
                </h1>
            </div>
        </section>
        <section className='bg-white w-full'>
            <div className='container max-w-2xl mx-auto pt-10 pb-20 text-lg'>
                <p>
                    At <strong>Review Holder</strong>, we value your privacy and are committed to protecting your personal information. This Privacy Policy outlines how we collect, use, and safeguard your data when you use our website.
                </p>
                <br />
                <h4 className='text-2xl font-semibold pb-2'>
                    Information We Collect:
                </h4>
                <ol className='flex flex-col gap-2 pl-5'>
                    <li>
                        When you visit our website, we may collect certain non-personal information such as your IP address, browser type, operating system, and pages visited. Also, we collect Message, Name, Email, and Website whenever you leave comment.
                        This information is used for analytical purposes to improve our website&apos;s performance and user experience.
                    </li>
                    <li>
                        If you choose to subscribe to our newsletter or interact with us through contact forms, we may collect your name and email address to provide you with updates and respond to your inquiries.
                    </li>
                </ol>
                <br />
                <br />
                <h4 className='text-2xl font-semibold pb-2'>
                    Use of Cookies:
                </h4>
                <ol className='flex flex-col gap-2 pl-5'>
                    <li>
                        Like many other websites, we use cookies to enhance your browsing experience. Cookies are small files that are stored on your device to remember your preferences and activities on our website. You can modify your browser settings to disable cookies if you prefer not to have them stored on your device.
                    </li>
                </ol>
                <br />
                <br />
                <h4 className='text-2xl font-semibold pb-2'>
                    Affiliate Links:
                </h4>
                <ol className='flex flex-col gap-2 pl-5'>
                    <li>
                        Please be aware that some of the links on our website are affiliate links. When you click on these links and make a purchase, we may earn a commission from the affiliated company. However, rest assured that this does not affect the price you pay for the product, and our reviews remain unbiased and independent.
                    </li>
                </ol>
                <br />
                <br />
                <h4 className='text-2xl font-semibold pb-2'>
                    Data Security:
                </h4>
                <ol className='flex flex-col gap-2 pl-5'>
                    <li>
                        We employ industry-standard security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction.
                        However, please understand that no data transmission over the Internet or electronic storage can be 100% secure, and we cannot guarantee absolute security.
                    </li>
                </ol>
                <br />
                <br />
                <h4 className='text-2xl font-semibold pb-2'>
                    Third-Party Links:
                </h4>
                <ol className='flex flex-col gap-2 pl-5'>
                    <li>
                        Our website may contain links to third-party websites, plugins, or services. Please note that we have no control over these external sites and are not responsible for their content or privacy practices. We encourage you to review the privacy policies of these third-party websites before providing any personal information.
                    </li>
                </ol>
                <br />
                <br />
                <h4 className='text-2xl font-semibold pb-2'>
                    Changes to Privacy Policy:
                </h4>
                <ol className='flex flex-col gap-2 pl-5'>
                    <li>
                        We may update our Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. Any updates will be posted on this page, and the &quot;Last Updated&quot; date will be revised accordingly.
                    </li>
                </ol>
                <br />
                <br />
                <p>
                    By using our website, you consent to the terms outlined in this Privacy Policy.
                </p>
            </div>
        </section>
        <Footer />
    </>);
};

export default PrivacyAndPolicy;