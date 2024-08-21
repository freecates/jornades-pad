import type { Metadata } from 'next';
import Script from 'next/script';
import { NewsArticle, WithContext } from 'schema-dts';
import api from '@/libs/api.js';
import { dateToLocale } from '@/utils/dateToLocale';
import { htmlToString } from '@/utils/htmlToString';
import { htmlEntityToString } from '@/utils/htmlEntityToString';

import styles from '@/app/page.module.scss';
import Post from '@/componnents/Post';

const PostPad = async ({ params }) => {
    const { artista } = await getData(params);
    const imageMetaData = artista?.acf?.foto_de_lartista.url;
    const pageTitle = artista?.title?.rendered;
    const content = artista?.acf?.biegrafia;
    const author = artista?.['_embedded'].author[0]?.name;
    const place = artista?.acf?.subtitol;
    const date = dateToLocale(artista?.date, 'ca');
    // const excerpt = artista?.acf?.destacat;

    const jsonLd: WithContext<NewsArticle> = {
        '@context': 'https://schema.org',
        '@type': 'NewsArticle',
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `https://www.jornadespad.cat/artistes/${artista.id}/${artista.slug}`,
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
        description: `${htmlToString(content)?.substring(0, 240)}...`,
        image: imageMetaData,
        datePublished: artista?.date,
        headline: pageTitle,
    };

    return (
        <div className={styles.content}>
            <Script
                id={artista.id}
                type='application/ld+json'
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <Post
                content={content}
                id={artista.id}
                slug={artista.slug}
                date={date}
                author={place}
                excerpt={`${pageTitle} - ${place}`}   
                title={pageTitle}
                type={artista.type}
                imageURL={imageMetaData}
            />
        </div>
    );
};

const getData = async (params) => {
    const artista = await api.wpData.getData('artistes', null, params.id, null, 30);

    if (!artista.data) {
        return { artista };
    } else {
        return { artista: null };
    }
};

export async function generateStaticParams() {
    const artistes = await api.wpData.getData('artistes', 100, null, 23, 30);
    const staticParamsPosts = artistes.map((artista: { id: number; slug: string }) => ({
        id: `${artista.id}`,
        slug: artista.slug,
    }));
    return [...staticParamsPosts];
}

const generateMetadata = async ({ params }): Promise<Metadata> => {
    const artista = await api.wpData.getData('artistes', null, params.id, null, 30);
    if (!artista) return { title: 'Not Found' };
    const imageMetaData = artista?.acf?.foto_de_lartista.url;
    const pageTitle = artista?.title?.rendered;
    const pageDescription = htmlToString(artista?.excerpt?.rendered)?.substring(0, 240);
    return {
        title: htmlEntityToString(pageTitle),
        description: `${pageDescription}`,
        alternates: {
            canonical: `https://www.jornadespad.cat/artistes/${artista.id}/${artista.slug}`,
        },
        openGraph: {
            title: pageTitle,
            description: `${pageDescription}...`,
            url: `https://www.jornadespad.cat/artistes/${artista.id}/${artista.slug}`,
            images: [
                {
                    url:imageMetaData,
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
            images: [imageMetaData],
        },
    };
};

export const dynamicParams = true;

export { generateMetadata };
export default PostPad;
