import type { Metadata } from 'next';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import api from '@/libs/api.js';
import { htmlToString } from '@/utils/htmlToString';
import { IMeta, IEvent } from '@/interfaces';
import EventsList from '@/componnents/EventsList';
import Blockquote from '@/componnents/Blockquote';

import styles from '@/app/page.module.scss';
import slugPageStyles from './slugPage.module.scss';

const inter = Inter({ subsets: ['latin'] });

type SlugPageProps = {
    pageData: {
        meta: IMeta;
        content: {
            title: string;
            mainContent?: string;
            pads?: IEvent[];
            image?: string;
            icon?: string;
            excerpt?: string;
            poster?: {
                name: string;
                url: string;
            };
            instagram?: {
                url: string;
                name: string;
            };
        };
    };
};

export default async function SlugPage({ params }) {
    const { slug } = params;
    const { pageData }: SlugPageProps = await getData(slug);
    const { content } = pageData;
    return (
        <>
            <div className={styles.content}>
                {content.image ? (
                    <div className={`${slugPageStyles['image-wrapper']}`}>
                        <Image src={`/${content.image}`} alt={content.title} fill={true} priority />
                    </div>
                ) : null}
                <h1 className={`${inter.className} ${content.icon ? styles.flex : ''}`}>
                    {content.icon ? (
                        <Image
                            src={`/${content.icon}`}
                            alt={content.title}
                            className={styles.logo}
                            width={95}
                            height={95}
                            priority
                        />
                    ) : null}
                    {content.instagram ? (
                        <span className={slugPageStyles.grid}>
                            {content.title}
                            <small>
                                <a
                                    href={content.instagram.url}
                                    target='_blank'
                                    title={content.instagram.name}
                                >
                                    @{content.instagram.name}
                                </a>
                            </small>
                        </span>
                    ) : (
                        content.title
                    )}
                </h1>
                {content?.excerpt ? <Blockquote content={content?.excerpt} /> : null}
                {content?.mainContent ? (
                    <div
                        className={inter.className}
                        dangerouslySetInnerHTML={{
                            __html: content.mainContent,
                        }}
                    />
                ) : null}
                {content?.poster ? (
                    <ul className={`${inter.className} ${slugPageStyles.list}`}>
                        <li>
                            <strong>{content.poster.name}:</strong>{' '}
                            {content.poster.url ? (
                                <a
                                    title={`Descarregar: ${content.poster.name}`}
                                    href={content.poster.url}
                                    download
                                >
                                    [<span className={slugPageStyles.down}>&#8595;</span>]
                                </a>
                            ) : (
                                'properament'
                            )}
                        </li>
                    </ul>
                ) : null}
                {content?.pads ? (
                    <div className={inter.className}>
                        <EventsList events={content.pads} />
                    </div>
                ) : null}
            </div>
        </>
    );
}

const getData = async (slug: string) => {
    const camelCased = slug.replace(/-([a-z])/g, function (g) {
        return g[1].toUpperCase();
    });
    const data = await api.padData.getData(camelCased);
    return {
        pageData: !data ? null : { ...data[0] },
    };
};

const generateMetadata = async ({ params }): Promise<Metadata> => {
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
