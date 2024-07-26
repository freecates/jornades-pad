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
    const { activitat } = await getData(params);
    const imageMetaData = activitat?.acf?.imatge_de_lactivitat.url;
    const pageTitle = activitat?.title?.rendered;
    const content = activitat?.acf?.descripcio_de_lactivitat;
    const author = activitat?.['_embedded'].author[0]?.name;
    const place = activitat?.acf?.localitzacio_de_lactivitat;
    const date = dateToLocale(activitat?.acf?.data_de_lactivitat, 'ca');
    // const excerpt = activitat?.acf?.destacat;

    const jsonLd: WithContext<NewsArticle> = {
        '@context': 'https://schema.org',
        '@type': 'NewsArticle',
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `https://www.jornadespad.cat/activitats/${activitat.id}/${activitat.slug}`,
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
        datePublished: activitat?.date,
        headline: pageTitle,
    };

    return (
        <div className={styles.content}>
            <Script
                id={activitat.id}
                type='application/ld+json'
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <Post
                content={content}
                id={activitat.id}
                slug={activitat.slug}
                date={date}
                author={place}
                excerpt={`${date} ${place}`}   
                title={pageTitle}
                type={activitat.type}
                imageURL={imageMetaData}
            />
        </div>
    );
};

const getData = async (params) => {
    const activitat = await api.wpData.getData('activitats', null, params.id, null, 30);

    if (!activitat.data) {
        return { activitat };
    } else {
        return { activitat: null };
    }
};

export async function generateStaticParams() {
    const activitats = await api.wpData.getData('activitats', 100, null, 23, 30);
    const staticParamsPosts = activitats.map((activitat: { id: number; slug: string }) => ({
        id: `${activitat.id}`,
        slug: activitat.slug,
    }));
    return [...staticParamsPosts];
}

const generateMetadata = async ({ params }): Promise<Metadata> => {
    const activitat = await api.wpData.getData('activitats', null, params.id, null, 30);
    if (!activitat) return { title: 'Not Found' };
    const imageMetaData = activitat?.acf?.imatge_de_lactivitat.url;
    const pageTitle = activitat?.title?.rendered;
    const pageDescription = htmlToString(activitat?.excerpt?.rendered)?.substring(0, 240);
    return {
        title: htmlEntityToString(pageTitle),
        description: `${pageDescription}`,
        alternates: {
            canonical: `https://www.jornadespad.cat/activitats/${activitat.id}/${activitat.slug}`,
        },
        openGraph: {
            title: pageTitle,
            description: `${pageDescription}...`,
            url: `https://www.jornadespad.cat/activitats/${activitat.id}/${activitat.slug}`,
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
