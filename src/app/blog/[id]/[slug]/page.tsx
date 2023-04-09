import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import api from '@/libs/api.js';
import { dateToLocale } from '@/utils/dateToLocale';

import styles from '@/app/page.module.scss';
import Post from '@/componnents/Post';

const inter = Inter({ subsets: ['latin'] });

const PostPad = async ({ params }) => {
    const { post } = await getData(params);
    const pageTitle = post?.title?.rendered;
    const content = post?.content?.rendered;
    const author = post?._embedded.author[0]?.name;
    const date = dateToLocale(post?.date, 'ca');
    const excerpt = post?.acf?.destacat;

    return (
        <div className={styles.content}>
            <Post
                content={content}
                id={post.id}
                slug={post.slug}
                date={date}
                author={author}
                excerpt={excerpt}
                title={pageTitle}
            />
        </div>
    );
};

const getData = async (params) => {
    const post = await api.wpData.getData('posts', null, params.id, null);

    if (!post.data) {
        return { post };
    } else {
        return { post: null };
    }
};

export async function generateStaticParams() {
    const posts = await api.wpData.getData('posts', 100, null, 23);
    const staticParamsPosts = posts.map((post: { id: number; slug: string }) => ({
        id: `${post.id}`,
        slug: post.slug,
    }));
    return [...staticParamsPosts];
}

const generateMetadata = async ({ params }): Promise<Metadata> => {
    const post = await api.wpData.getData('posts', null, params.id, null);
    if (!post) return { title: 'Not Found' };
    const pageTitle = post?.title?.rendered;
    const pageDescription = post?.excerpt?.rendered.replace(/(<([^>]+)>)/gi, '');
    return {
        title: pageTitle,
        description: `${pageDescription}`,
        alternates: {
            canonical: `https://jornadespad.cat/blog/${post.id}/${post.slug}`,
        },
    };
};

export const dynamicParams = true;

export const revalidate = 30;

export { generateMetadata };
export default PostPad;
