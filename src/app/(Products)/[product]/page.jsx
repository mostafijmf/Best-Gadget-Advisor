import { Suspense } from 'react';
import BlogPage from '@/components/BlogPosts/BlogPage';
import PageLoading from '@/components/Spinners/PageLoading';
import { getBlogByPathName } from '@/libs/apiServices';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer';
import LeaveAReply from '@/components/LeaveAReply';

export const generateMetadata = async ({ params }) => {
    const pathName = params?.product || '';
    const blog = await getBlogByPathName(pathName);

    return {
        title: blog?.title || '',
        description: blog?.metaDescription || '',
        alternates: {
            canonical: `https://www.reviewholder.com${blog?.pathName}`,
        },
    }
};


const Products = async ({ params }) => {
    const pathName = params?.product || '';
    const blog = await getBlogByPathName(pathName);

    return (<>
        <Navbar/>
        <main>
            <div className='container max-w-[48rem] mx-auto'>
                <Suspense fallback={<PageLoading />}>
                    <section className='mb-20 mt-14'>
                        <BlogPage data={blog} />
                    </section>
                    <section className='mb-28'>
                        <LeaveAReply blog={blog} />
                    </section>
                </Suspense>
            </div>
        </main>
        <Footer />
    </>);
};

export default Products;


