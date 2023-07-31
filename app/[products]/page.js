"use client";
import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';
import TextEditor from '@/components/TextEditor';
import { useState } from 'react';


const Products = () => {
    const currentPath = usePathname();
    const [content, setContent] = useState('');

    return (<>
        <Navbar />
        <section>
            <div className='container'>
                <div className='max-w-2xl mx-auto py-10'>
                    <h1 className='text-4xl font-semibold text-primary mb-5'>
                        10 Best Earbuds for Small Ears in 2023
                    </h1>
                    <p className='text-lg'>
                        The Apple AirPods Pro (2nd Generation) is the most recommended option because of its comfort and performance in this list of the best earbuds for small ears. Designed with the intention of providing a richer audio experience, these wireless earbuds are equipped with Apple's powerful H2 chip, taking noise cancellation and sound immersion to new heights. The H2 chip serves as the driving force behind these advanced earbuds, enabling smarter active noise cancellation that adapts to your surroundings effortlessly. One size doesn't fit all, and Apple knows it! That's why the AirPods Pro (2nd Generation) comes with four pairs of silicone tips (XS, S, M, L) to ensure a snug and customizable fit for a wider range of ear shapes. The magic of Spatial Audio awaits you! This technology surrounds you in sound that's personalized to your ears, creating a mesmerizing 3D audio experience. With dynamic head tracking, you'll feel like you're at the center of the action, whether you're listening to music or watching movies. Controlling your AirPods Pro (2nd Generation) is now easier than ever. A simple swipe on the stem lets you adjust the volume effortlessly, and press it to play, pause, or answer/end a call. Hold the stem, and you can switch between Active Noise Cancellation and Adaptive Transparency in a snap, adapting to your changing environment with ease. Worried about running out of battery life? Fear not! With up to 6 hours of listening time on a single charge with Active Noise Cancellation enabled, the AirPods Pro (2nd Generation) outlast their predecessors by an impressive 33%. And with the charging case, you'll get a whopping 30 hours of total listening time, ensuring your earbuds are always ready for your next adventure. It's crucial to choose the right size, ensuring the earbuds sit snugly in your ears for optimal sound quality and call performance. Remember, it's the details that can make a significant difference in your audio experience.
                    </p>
                </div>
            </div>
        </section>
        <section className='container my-20'>
            <TextEditor content={content} setContent={setContent} />

            {/* <div className='my-10' dangerouslySetInnerHTML={{ __html: content }} />
            {content} */}
        </section >
    </>);
};

export default Products;


