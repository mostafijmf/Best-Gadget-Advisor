"use client";
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import LatestPosts from '@/components/posts/LatestPosts';
import Footer from '@/components/Footer';

export const metadata = {
  title: "Home",
}

const Home = () => {
  const [activePost, setActivePost] = useState('latestPosts');

  return (<>
    <section>
      <Navbar />
      <div className='container mx-auto'>
        <div className='py-20 text-center'>
          <span className='text-xl font-medium text-secondary block pb-5'>
            We are here
          </span>
          <h1 className='max-w-4xl mx-auto text-6xl font-bold text-primary leading-[1.2] tracking-tight capitalize'>
            To make it easier to find the best product for your needs.
          </h1>
        </div>
      </div>
    </section>

    <section>
      <div className='container mt-20'>
        <div className='flex items-center gap-8 border-b-4 border-primary pb-2'>
          <h2
            onClick={() => setActivePost('latestPosts')}
            className={`text-2xl font-medium text-primary cursor-pointer ${activePost === 'latestPosts' && 'text-secondary'}`}
          >
            Latest Posts
          </h2>
          <h2
            onClick={() => setActivePost('popularPosts')}
            className={`text-2xl font-medium text-primary cursor-pointer ${activePost === 'popularPosts' && 'text-secondary'}`}
          >
            Popular Posts
          </h2>
        </div>
        <div className='py-10 mb-32'>
          {
            activePost === 'latestPosts' &&
            <LatestPosts />
          }
        </div>
      </div>
    </section>
    <Footer />
  </>);
};

export default Home;