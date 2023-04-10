import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import api from '@/libs/api.js';
import { htmlToString } from '@/utils/htmlToString';
import EventsList from '@/componnents/EventsList';

import styles from '@/app/page.module.scss';
import padPageStyles from '@/app/padPage.module.scss';

const inter = Inter({ subsets: ['latin'] });

type PadPageProps = {
    pageData: {
        name: string;
        place: string;
        map: string;
        date: string;
        summary: string;
        route: string;
        startTime: string;
    };
};

export default async function PadPage({ params }) {
    const { slug, pad } = params;
    const { pageData }: PadPageProps = await getData(slug, pad);
    const { name, place, map, date, summary, route, startTime } = pageData;
    const event = [{name, place, map, route, date, summary, startTime}];
    return (
        <>
            <div className={styles.content}>
                <h1 className={`${inter.className} ${padPageStyles.title} ${route ? padPageStyles[route] : ''}`}>
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

const getData = async (slug: string, pad: string) => {
    const camelCased = slug.replace(/-([a-z])/g, function (g) {
        return g[1].toUpperCase();
    });
    const data = await api.padData.getData(camelCased);
    const pads = data[0].content.pads;
    const padData = pads.filter((x: { route: string; }) => x.route === pad);

    return {
        pageData: !data ? null : { ...padData[0] },
    };
};

const generateMetadata = async ({ params }): Promise<Metadata> => {
    const { slug, pad } = params;
    const camelCased = slug.replace(/-([a-z])/g, function (g: string[]) {
        return g[1].toUpperCase();
    });
    const data = await api.padData.getData(camelCased);
    if (!data) return { title: 'Not Found' };
    const pads = data[0].content.pads;
    const padData = pads.filter((x: { route: any; }) => x.route === pad);
    const { name, summary } = padData[0];
    const description = htmlToString(summary);
    return {
        title: `${name}`,
        description: `${description}`,
        alternates: {
            canonical: `https://www.jornadespad.cat/${slug}/${pad}`,
        },
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
