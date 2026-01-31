import Image from 'next/image';
import type { Metadata } from 'next';
import api from '@/libs/api.js';
import { htmlToString } from '@/utils/htmlToString';
import EventsList from '@/componnents/EventsList';

import styles from '@/app/page.module.scss';
import padPageStyles from './padPage.module.scss';
import Link from 'next/link';
import eventMapper from '@/utils/eventMapper';

type PadPageProps = {
    name: string;
    place: string;
    map: string;
    date: string;
    when: string;
    summary: string;
    route: string;
    startTime: string;
    endTime: string;
    bases: string;
    localBases: string;
    form: string;
    image?: string;
    program: string;
    isCancelled: boolean;
    isClosed?: boolean;
    type: string;
};

export default async function PadPage({ params }: { params: { slug: string; pad: string; }; }) {
    const { slug, pad } = await params;
    const pageData: PadPageProps = await getPageDataFromCMS(slug, pad);
    const { name, place, map, date, when, summary, route, startTime, endTime, bases, localBases, form, image, program, isCancelled, isClosed, type } = pageData;
    const event = [{name, place, map, route, date, when, summary, startTime, endTime, bases, localBases, form, program, isCancelled, isClosed, type }];
    return (
        <>
            <div className={styles.content}>
                <div className={padPageStyles['image-wrapper']}>
                    <Image
                        src={image}
                        alt={name}
                        className={styles.adhocLogo}
                        fill={true}
                        priority
                    />
                </div>

                <h1 className={`${padPageStyles.title} ${route ? padPageStyles[route] : ''}`}>
                    {name}
                </h1>
                {summary ? (
                    <div
                        className={`${styles['m-b-1']}`}
                        dangerouslySetInnerHTML={{
                            __html: summary,
                        }}
                    />
                ) : null}
                {date ? (
                    <div>
                        <EventsList events={event} />
                    </div>
                ) : null}
                
                <p>
                    <small>
                        <Link href={'/les-jornades-pad'}>[tornar a les jornades PAD]</Link>, <Link href={'/el-pad-social'}>[tornar al PAD Social]</Link>
                    </small>
                </p>
                
            </div>
        </>
    );
}

const getPageDataFromCMS = async (slug: string, pad: string) => {
    const postPagedData = await api.wpData.getData(slug, null, null, null, 30);
    const padData = eventMapper(postPagedData.find((x: { slug: string; }) => x.slug === pad));

    if (!padData) {
        return null;
    } else {
        return padData;
    }
};

const generateMetadata = async (props): Promise<Metadata> => {
    const params = await props.params;
    const { slug, pad } = params;
    const pageData: PadPageProps = await getPageDataFromCMS(slug, pad);
    const { name, summary } = pageData;
    const description = htmlToString(summary);
    return {
        title: `${name}`,
        description: `${description}`,
        alternates: {
            canonical: `https://www.jornadespad.cat/${slug}/${pad}`,
        },
    };
};

export const dynamicParams = true;
export const revalidate = 30;

export { generateMetadata };
