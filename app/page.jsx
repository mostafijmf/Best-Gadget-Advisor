import Link from 'next/link';
import Image from 'next/image';
import { Suspense } from 'react';
import dayjs from 'dayjs';
import Footer from '@/components/Footer';
import PageLoading from '@/components/Spinners/PageLoading';
import ResultNotFound from '@/components/ResultNotFound';
import { getBlogs } from '@/libs/apiServices';
import Navbar from '@/components/Navbar/Navbar';
import Icons from '@/components/Icons';

export const metadata = {
  title: 'Home | Best Gadget Advisor',
  description: 'We are here To Make It Easier To Find The Best Product For Your Needs.'
};


const Home = async () => {
  const [
    { blogs: latestBlogs },
    { blogs: popularBlogs }
  ] = await Promise.all([getBlogs('latest'), getBlogs('popular')]);


  return (<>
    <Navbar />
    <section>
      <div className='container mx-auto'>
        <div className='py-20 text-center'>
          <span className='text-xl font-medium text-secondary block pb-5'>
            We are here
          </span>
          <h1 className='max-w-4xl mx-auto lg:text-6xl md:text-5xl text-4xl font-bold text-primary leading-[1.2] tracking-tight capitalize'>
            To make it easier to find the best product for your needs.
          </h1>
        </div>
      </div>
    </section>
    <Suspense fallback={<PageLoading />}>
      <section className='container mx-auto mt-20'>
        <div className='border-b-4 border-primary pb-2'>
          <h3 className='text-primary lg:text-2xl text-xl font-medium'>Latest Posts</h3>
        </div>

        <div className={`grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-y-10 gap-x-8 my-6`}>
          {latestBlogs.length === 0 ?
            <ResultNotFound />
            : <>
              {latestBlogs.map(blog =>
                <div key={blog._id} className='w-full h-min rounded-md overflow-hidden bg-white shadow-[0_8px_30px_rgba(0,0,0,.12)] mx-auto group/card'>
                  <Link href={blog.pathName} className='w-full h-full block'>
                    <div className='w-full h-44'>
                      <Image
                        src={blog.coverPhoto_src}
                        alt={blog.coverPhoto_alt}
                        width={240}
                        height={180}
                        className='w-full h-full object-cover'
                      />
                    </div>
                    <div className='w-full px-5 py-3'>
                      <h4 className='text-lg text-primary font-semibold group-hover/card:underline'>{blog.title}</h4>
                      <p className='text-sm text-gray-600 my-2'>{blog.metaDescription}</p>
                      <p className='text-sm text-gray-600'>
                        {dayjs(blog.createdAt).format("DD-MMM-YYYY")}
                      </p>
                    </div>
                  </Link>
                </div>
              )}

              <Link
                href={`/product-reviews?posts=latest`}
                className='w-full h-full py-24 grid place-items-center rounded-md backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,.12)] group/card'
              >
                <div className='flex items-center gap-2 group-hover/card:gap-3 text-base font-semibold text-primary group-hover/card:text-secondary duration-300'>
                  More post
                  <Icons icon="guidance:left-arrow" width="20" />
                </div>
              </Link>
            </>
          }
        </div>
      </section>

      <section className='container mx-auto my-24'>
        <div className='border-b-4 border-primary pb-2'>
          <h3 className='text-primary lg:text-2xl text-xl font-medium'>Popular Posts</h3>
        </div>

        <div className={`grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-y-10 gap-x-8 my-6`}>
          {popularBlogs.length === 0 ?
            <ResultNotFound />
            : <>
              {popularBlogs.map(blog =>
                <div key={blog._id} className='w-full h-min rounded-md overflow-hidden bg-white shadow-[0_8px_30px_rgba(0,0,0,.12)] mx-auto group/card'>
                  <Link href={blog.pathName} className='w-full h-full block'>
                    <div className='w-full h-44'>
                      <Image
                        src={blog.coverPhoto_src}
                        alt={blog.coverPhoto_alt}
                        width={240}
                        height={180}
                        className='w-full h-full object-cover'
                      />
                    </div>
                    <div className='w-full px-5 py-3'>
                      <h4 className='text-lg text-primary font-semibold group-hover/card:underline'>{blog.title}</h4>
                      <p className='text-sm text-gray-600 my-2'>{blog.metaDescription}</p>
                      <p className='text-sm text-gray-600'>
                        {dayjs(blog.createdAt).format("DD-MMM-YYYY")}
                      </p>
                    </div>
                  </Link>
                </div>
              )}
              <Link
                href={`/product-reviews?posts=popular`}
                className='w-full h-full py-24 grid place-items-center rounded-md backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,.12)] group/card'
              >
                <div className='flex items-center gap-2 group-hover/card:gap-3 text-base font-semibold text-primary group-hover/card:text-secondary duration-300'>
                  More post
                  <Icons icon="guidance:left-arrow" width="20" />
                </div>
              </Link>
            </>
          }
        </div>
      </section>
    </Suspense>
    <Footer />
  </>);
};

export default Home;