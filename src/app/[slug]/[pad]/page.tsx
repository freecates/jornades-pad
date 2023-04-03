import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import api from '@/app/libs/api.js';
import EventsList from '@/app/componnents/EventsList';

import styles from '@/app/page.module.scss';

const inter = Inter({ subsets: ['latin'] });

type PadPageProps = {
    pageData: {
        name: string;
        place: string;
        map: string;
        date: string;
        summary: string;
        route: string;
    };
};

export default async function PadPage({ params }) {
    const { slug, pad } = params;
    const { pageData }: PadPageProps = await getData(slug, pad);
    const { name, place, map, date, summary, route } = pageData;
    const event = [{name, place, map, route, date}];
    return (
        <>
            <div className={styles.content}>
                <h1 className={inter.className}>
                    {name}
                </h1>
                {summary ? (
                    <div
                        className={`${inter.className} ${styles['m-b-1']}`}
                        dangerouslySetInnerHTML={{
                            __html: summary,
                        }}
                    />
                ) : null}
                {date ? (
                    <div className={inter.className}>
                        <EventsList events={event} />
                    </div>
                ) : null}
                
            </div>
        </>
    );
}

const getData = async (slug: string, pad) => {
    const camelCased = slug.replace(/-([a-z])/g, function (g) {
        return g[1].toUpperCase();
    });
    const data = await api.padData.getData(camelCased);
    const pads = data[0].content.pads;
    const padData = pads.filter(x => x.route === pad);

    return {
        pageData: !data ? null : { ...data[0], ...padData[0] },
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
    return {
        title: pageTitle,
        description: `${pageDescription} | ${title}`,
    };
};

export const generateStaticParams = async () => {
    return [
        { slug: 'les-jornades-pad', pad: 'pad-3dt' },
        { slug: 'les-jornades-pad', pad: 'pad-espiga-t' },
        { slug: 'les-jornades-pad', pad: 'pad-mev' },
        { slug: 'les-jornades-pad', pad: 'pad-fida' },
    ];
};

export const dynamicParams = false;

export const revalidate = 30;

export { generateMetadata };
