import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar/Navbar";

export const metadata = {
    title: "About Us",
    description: "We are passionate about gadgets and technology, and we understand how overwhelming it can be to find the perfect product that suits your needs. That&apos;s why we started this journey—to help you make well-informed decisions when it comes to buying gadgets and products.",
};

const About = () => {
    return (<>
        <Navbar />
        <section className="py-24 border-b">
            <div className="container max-w-2xl mx-auto">
                <h1 className='text-center lg:text-6xl md:text-5xl text-4xl font-bold text-primary tracking-tight'>
                    About
                </h1>
            </div>
        </section>
        <section className="pt-10 pb-20 bg-white">
            <div className="container max-w-2xl mx-auto text-lg text-gray-600">
                <p className="text-xl font-semibold pb-5 text-primary">
                    Welcome to Review Holder!
                </p>
                <p>
                    We are passionate about gadgets and technology, and we understand how overwhelming it can be to find the perfect product that suits your needs. That&apos;s why we started this journey—to help you make well-informed decisions when it comes to buying gadgets and products.
                </p>
                <br />
                <p>
                    Our team of tech enthusiasts is dedicated to thoroughly researching and reviewing a wide range of gadgets. We know that technology is constantly evolving, and staying up-to-date with the latest advancements is crucial. That&apos;s why we strive to keep our content fresh and relevant, providing you with the most accurate and reliable information.
                </p>
                <br />
                <p>
                    Honesty and transparency are at the core of everything we do. We believe in presenting the strengths and weaknesses of each product objectively, enabling you to see both sides of the coin. Our reviews are based on real experiences and feedback from users, ensuring that you get a comprehensive understanding of the product&apos;s performance.
                </p>
                <br />
                <p>
                    As an affiliate website, we do earn a commission from some of the links on our site. However, rest assured that our reviews and recommendations are not influenced by these partnerships. Your trust means the world to us, and we are committed to maintaining the highest level of integrity and authenticity.
                </p>
                <br />
                <p>
                    Our goal is simple—to be your go-to source for unbiased and trustworthy gadget reviews. We want to empower you to make confident buying decisions, knowing that you are getting the best value for your hard-earned money.
                </p>
                <br />
                <hr />
                <br />
                <p>
                    Join us on this tech-filled journey, and together, let&apos;s explore the fascinating world of gadgets and products. If you have any questions, feedback, or suggestions, we&apos;d love to hear from you. Feel free to reach out to us, and we&apos;ll be more than happy to assist you.
                </p>
                <br />
                <p>
                    Thank you for choosing <strong>Review Holder</strong> as your trusted guide in the world of technology.
                </p>
                <br />
                <p>
                    Happy gadget hunting!
                </p>
                <br />
                <p>
                    <strong>The Review Holder Team</strong>
                    <br />
                    <span className="text-base">05-08-2023</span>
                </p>
            </div>
        </section>
        <Footer />
    </>);
};

export default About;