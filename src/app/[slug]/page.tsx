import Blockquote from '@/componnents/Blockquote';
import EventsList from '@/componnents/EventsList';
import { IEvent } from '@/interfaces';
import api from '@/libs/api.js';
import findNumberByNameWithFind from '@/utils/findNumberByNameWithFind';
import { htmlToString } from '@/utils/htmlToString';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import styles from '@/app/page.module.scss';
import slugPageStyles from './slugPage.module.scss';
import findNameByNumberWithFind from '@/utils/findNameByNumberWithFind';
import eventMapper from '@/utils/eventMapper';

type Params = Promise<{ slug: string }>;

const padPages = [
    { 'les-jornades-pad': 679 },
    { 'el-pad-social': 680 },
    { 'el-pad': 681 },
    { 'el-pad-academia': 700 }
];
const postPages = [{ 679: 'pad-jornada' }, { 680: 'pad-social' }];

interface WpPageData {
    title: { rendered: string };
    acf?: { quote?: string };
    content: { rendered: string };
    data?: any;
}

type SlugPageData = {
    pageData: WpPageData & { pads?: IEvent[] } | null;
};

export default async function SlugPage({ params }: { params: Params }) {
    const { slug } = await params;
    
    const response = await getPageDataFromCMS(slug);

    if (!response || !response.pageData) {
        return notFound();
    }

    const { pageData } = response;
    const { pads } = pageData;
    
    const poster: { name: string; url: string } | null = null; 

    return (
        <div className={styles.content}>
            <h1>{pageData.title?.rendered}</h1>
            
            {pageData.acf?.quote && (
                <Blockquote content={pageData.acf.quote} />
            )}
            
            {pageData.content?.rendered && (
                <div
                    dangerouslySetInnerHTML={{
                        __html: pageData.content.rendered,
                    }}
                />
            )}

            {poster && (
                <ul className={slugPageStyles.list}>
                    <li>
                        <strong>{poster.name}:</strong>{' '}
                        {poster.url ? (
                            <a title={`Descarregar: ${poster.name}`} href={poster.url} download>
                                [<span className={slugPageStyles.down}>&#8595;</span>]
                            </a>
                        ) : (
                            'properament'
                        )}
                    </li>
                </ul>
            )}

            {pads && pads.length > 0 && (
                <div>
                    <EventsList events={pads} />
                </div>
            )}
        </div>
    );
}

const getPageDataFromCMS = async (slug: string): Promise<SlugPageData> => {
    const id = findNumberByNameWithFind(slug, padPages);
    
    if (!id) return { pageData: null };

    const name = findNameByNumberWithFind(id, postPages);

    const [rawPageData, postPagedData] = await Promise.all([
        api.wpData.getData('pagina-del-web-pad', null, id, null, 30),
        name ? api.wpData.getData(name, null, null, null, 30) : Promise.resolve([])
    ]);
    const pads = Array.isArray(postPagedData) ? postPagedData.map(eventMapper) : [];

    if (rawPageData && !rawPageData.data) {
        return { 
            pageData: { 
                ...rawPageData, 
                pads 
            } 
        };
    } else {
        return { pageData: null };
    }
};

export const generateMetadata = async ({ params }: { params: Params }): Promise<Metadata> => {
    const { slug } = await params;
    
    const camelCased = slug.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
    
    try {
        const data = await api.padData.getData(camelCased);
        if (!data || !data[0]) return { title: 'Pàgina no trobada' };

        const meta = { ...data[0].meta };
        const { pageTitle, title, pageDescription } = meta;
        const description = htmlToString(pageDescription);

        return {
            title: pageTitle,
            description: `${description} | ${title}`,
            alternates: {
                canonical: `https://www.jornadespad.cat/${slug}`,
            },
        };
    } catch (error) {
        console.error("Error generant metadata:", error);
        return { title: 'Jornades PAD' };
    }
};

export const generateStaticParams = async () => {
    return [
        { slug: 'el-pad' }, 
        { slug: 'el-pad-social' }, 
        { slug: 'les-jornades-pad' }
    ];
};

export const dynamicParams = true;
export const revalidate = 30;