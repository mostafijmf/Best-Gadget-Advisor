import React from 'react';

const LatestPosts = () => {
    const posts = [
        {
            title: '8 Best Earbuds With Earhooks in 2023',
            banner: 'https://headphonesproreview.com/wp-content/uploads/2023/07/1-Can-People-Hear-My-AirPods-1.jpg',
            description: 'Looking for the best earbuds with earhooks? Discover our top picks that combine comfort, stability, and exceptional sound quality',
            publish: 'June 2, 2023',
        },
        {
            title: '9 Best Earbuds With Earhooks in 2023',
            banner: 'https://headphonesproreview.com/wp-content/uploads/2023/07/1-Can-People-Hear-My-AirPods-1.jpg',
            description: 'Looking for the best earbuds with earhooks? Discover our top picks that combine comfort, stability, and exceptional sound quality',
            publish: 'June 2, 2023',
        },
        {
            title: '10 Best Earbuds With Earhooks in 2023',
            banner: 'https://headphonesproreview.com/wp-content/uploads/2023/07/1-Can-People-Hear-My-AirPods-1.jpg',
            description: 'Looking for the best earbuds with earhooks? Discover our top picks that combine comfort, stability, and exceptional sound quality',
            publish: 'June 2, 2023',
        },
        {
            title: '11 Best Earbuds With Earhooks in 2023',
            banner: 'https://headphonesproreview.com/wp-content/uploads/2023/07/1-Can-People-Hear-My-AirPods-1.jpg',
            description: 'Looking for the best earbuds with earhooks? Discover our top picks that combine comfort, stability, and exceptional sound quality',
            publish: 'June 2, 2023',
        },
    ];

    return (
        <div className='flex flex-col gap-10'>
            {
                posts.map(post =>
                    <div key={post.title} className='max-w-5xl flex items-start gap-7'>
                        <div className='w-max'>
                            <img
                                src={post.banner}
                                alt='Post banner'
                                className='w-[360px] h-auto'
                            />
                        </div>
                        <div className='w-[calc(100%-388px)]'>
                            <div>
                                <h3 className='text-primary text-3xl font-semibold'>
                                    {post.title}
                                </h3>
                                <p className='text-base text-gray-600 my-4'>
                                    {post.description}
                                </p>
                                <p>
                                    {post.publish}
                                </p>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default LatestPosts;