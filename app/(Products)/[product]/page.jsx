import { Suspense } from 'react';
import BlogPage from '@/components/BlogPosts/BlogPage';
import PageLoading from '@/components/Spinners/PageLoading';
import { getBlogByPathName } from '@/libs/apiServices';

export const generateMetadata = async ({ params }) => {
    const pathName = params?.product || '';
    const blog = await getBlogByPathName(pathName);

    return {
        title: blog?.title || 'Title',
        description: blog?.metaDescription || '',
    }
}


const Products = async ({ params }) => {
    const pathName = params?.product || '';
    const blog = await getBlogByPathName(pathName);

    return (<>
        <section className='container mt-14 mb-10'>
            <Suspense fallback={<PageLoading />}>
                <BlogPage data={blog} />
            </Suspense>
        </section>
    </>);
};

export default Products;


