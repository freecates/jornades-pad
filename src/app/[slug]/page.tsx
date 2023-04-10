import type { Metadata } from 'next';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import api from '@/libs/api.js';
import { IMeta, IEvent } from '@/interfaces';
import EventsList from '@/componnents/EventsList';
import Blockquote from '@/componnents/Blockquote';

import styles from '../page.module.scss';

const inter = Inter({ subsets: ['latin'] });

type SlugPageProps = {
    pageData: {
        meta: IMeta;
        content: {
            title: string;
            mainContent?: string;
            pads?: IEvent[];
            image?: string;
            excerpt?: string;
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
                <h1 className={`${inter.className} ${content.image ? styles.flex : ''}`}>{content.image ? 
            <Image
              src={`/${content.image}`}
              alt={content.title}
              className={styles.logo}
              width={95}
              height={95}
              priority
            /> : null }
                    {content.title}
                </h1>
                {content?.mainContent ? (
                    <div
                        className={inter.className}
                        dangerouslySetInnerHTML={{
                            __html: content.mainContent,
                        }}
                    />
                ) : null}
                {content?.excerpt ? 
                <Blockquote content={content?.excerpt} />
                : null}
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
    const description = pageDescription.replace(/(<([^>]+)>)/gi, '');
    return {
        title: pageTitle,
        description: `${description} | ${title}`,
        alternates: {
            canonical: `https://jornadespad.cat/${slug}`,
        },
    };
};

export const generateStaticParams = async () => {
    return [{ slug: 'el-pad' }, { slug: 'la-nut' }, { slug: 'les-jornades-pad' }];
};

export const dynamicParams = false;

export const revalidate = 30;

export { generateMetadata };
