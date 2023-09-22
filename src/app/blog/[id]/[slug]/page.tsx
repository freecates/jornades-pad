import type { Metadata } from 'next';
import Script from 'next/script';
import { NewsArticle, WithContext } from 'schema-dts';
import api from '@/libs/api.js';
import { dateToLocale } from '@/utils/dateToLocale';
import { htmlToString } from '@/utils/htmlToString';
import { htmlEntityToString } from '@/utils/htmlEntityToString';

import styles from '@/app/page.module.scss';
import Post from '@/componnents/Post';

const imageMetaData = '/jornades-pad-1024.png';

const PostPad = async ({ params }) => {
    const { post } = await getData(params);
    const pageTitle = post?.title?.rendered;
    const content = post?.content?.rendered;
    const author = post?.['_embedded'].author[0]?.name;
    const date = dateToLocale(post?.date, 'ca');
    const excerpt = post?.acf?.destacat;

    const jsonLd: WithContext<NewsArticle> = {
        '@context': 'https://schema.org',
        '@type': 'NewsArticle',
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `https://www.jornadespad.cat/blog/${post.id}/${post.slug}`,
        },
        author: {
            '@type': 'Person',
            name: author,
        },
        publisher: {
            '@type': 'Organization',
            name: 'Adhoc Cultura',
            logo: {
                '@type': 'ImageObject',
                url: imageMetaData,
            },
        },
        description: `${htmlToString(content).substring(0, 240)}...`,
        image: `https://www.jornadespad.cat${imageMetaData}`,
        datePublished: post?.date,
        headline: pageTitle,
    };

    return (
        <div className={styles.content}>
            <Script
                id={post.id}
                type='application/ld+json'
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
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
    const post = await api.wpData.getData('posts', null, params.id, null, 30);

    if (!post.data) {
        return { post };
    } else {
        return { post: null };
    }
};

export async function generateStaticParams() {
    const posts = await api.wpData.getData('posts', 100, null, 23, 30);
    const staticParamsPosts = posts.map((post: { id: number; slug: string }) => ({
        id: `${post.id}`,
        slug: post.slug,
    }));
    return [...staticParamsPosts];
}

const generateMetadata = async ({ params }): Promise<Metadata> => {
    const post = await api.wpData.getData('posts', null, params.id, null, 30);
    if (!post) return { title: 'Not Found' };
    const pageTitle = post?.title?.rendered;
    const pageDescription = htmlToString(post?.excerpt?.rendered).substring(0, 240);
    return {
        title: htmlEntityToString(pageTitle),
        description: `${pageDescription}`,
        alternates: {
            canonical: `https://www.jornadespad.cat/blog/${post.id}/${post.slug}`,
        },
        openGraph: {
            title: pageTitle,
            description: `${pageDescription}...`,
            url: `https://www.jornadespad.cat/blog/${post.id}/${post.slug}`,
            images: [
                {
                    url: `https://www.jornadespad.cat${imageMetaData}`,
                    width: 1024,
                    height: 1024,
                },
            ],
            type: 'article',
        },
        twitter: {
            card: 'summary_large_image',
            title: pageTitle,
            description: `${pageDescription}...`,
            site: '@AdhocCultura',
            creator: 'Adhoc Cultura',
            images: [`https://www.jornadespad.cat${imageMetaData}`],
        },
    };
};

export const dynamicParams = true;

export { generateMetadata };
export default PostPad;
