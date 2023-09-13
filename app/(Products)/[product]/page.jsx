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
}


const Products = async ({ params }) => {
    const pathName = params?.product || '';
    const blog = await getBlogByPathName(pathName);

    return (<>
        <Navbar />
        <Suspense fallback={<PageLoading />}>
            <section className='container mt-14 mb-10'>
                <BlogPage data={blog} />
            </section>
            <section className='container'>
                <LeaveAReply blog={blog} />
            </section>
        </Suspense>
        <Footer />
    </>);
};

export default Products;


