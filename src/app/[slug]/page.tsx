import Blockquote from '@/componnents/Blockquote';
import EventsList from '@/componnents/EventsList';
import { IEvent } from '@/interfaces';
import api from '@/libs/api.js';
import findNumberByNameWithFind from '@/utils/findNumberByNameWithFind';
import { htmlToString } from '@/utils/htmlToString';
import type { Metadata } from 'next';

import styles from '@/app/page.module.scss';
import slugPageStyles from './slugPage.module.scss';

const padPages = [{ 'les-jornades-pad': 679 }, { 'el-pad-social': 680 }, { 'el-pad': 681 }];

type SlugPageProps = {
    pageData: {
        title: {
            rendered: string;
        };
        acf: {
            quote: string;
        };
        content: {
            rendered: string;
        };
        mainContent?: string;
        pads?: IEvent[];
        poster?: {
            name: string;
            url: string;
        };
    };
};

export default async function SlugPage(props) {
    const params = await props.params;
    const { slug } = params;
    const { pageData }: SlugPageProps = await getPageDataFromCMS(slug);
    const poster = null;
    const pads = null;
    return (
        <>
            <div className={styles.content}>
                <h1>{pageData?.title?.rendered}</h1>
                {pageData?.acf?.quote ? <Blockquote content={pageData?.acf?.quote} /> : null}
                {pageData?.content?.rendered ? (
                    <div
                        dangerouslySetInnerHTML={{
                            __html: pageData?.content?.rendered,
                        }}
                    />
                ) : null}
                {poster ? (
                    <ul className={`${slugPageStyles.list}`}>
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
                ) : null}
                {pads ? (
                    <div>
                        <EventsList events={pads} />
                    </div>
                ) : null}
            </div>
        </>
    );
}

const getPageDataFromCMS = async (slug: string) => {
    const id = findNumberByNameWithFind(slug, padPages);
    const pageData = await api.wpData.getData('pagina-del-web-pad', null, id, null, 30);

    if (!pageData.data) {
        return { pageData };
    } else {
        return { pageData: null };
    }
};

const generateMetadata = async (props): Promise<Metadata> => {
    const params = await props.params;
    const { slug } = params;
    const camelCased = slug.replace(/-([a-z])/g, function (g) {
        return g[1].toUpperCase();
    });
    const data = await api.padData.getData(camelCased);
    if (!data) return { title: 'Not Found' };
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
};

export const generateStaticParams = async () => {
    return [{ slug: 'el-pad' }, { slug: 'el-pad-social' }, { slug: 'les-jornades-pad' }];
};

export const dynamicParams = false;

export const revalidate = 30;

export { generateMetadata };
