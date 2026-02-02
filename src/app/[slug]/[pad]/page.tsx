import Image from 'next/image';
import type { Metadata } from 'next';
import api from '@/libs/api.js';
import { htmlToString } from '@/utils/htmlToString';
import EventsList from '@/componnents/EventsList';
import styles from '@/app/page.module.scss';
import padPageStyles from './padPage.module.scss';
import Link from 'next/link';
import eventMapper from '@/utils/eventMapper';
import { notFound } from 'next/navigation';
import { IVideo } from '@/interfaces';
import videoMapper from '@/utils/videoMapper';
import Video from '@/componnents/Video';

type Params = Promise<{ slug: string; pad: string }>;

type PadPageData = {
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
    video?: IVideo;
    program: string;
    isCancelled: boolean;
    isClosed?: boolean;
    type: string;
};

const getPageDataFromCMS = async (slug: string, pad: string) => {
    const postPagedData = await api.wpData.getData(slug, null, null, null, 30);
    if (!postPagedData) return null;
    
    const padData = eventMapper(postPagedData.find((x: { slug: string; }) => x.slug === pad));

    if (!padData) {
        return null;
    } else {
        return { ...padData, video: videoMapper(padData.video) };
    }
};

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
    const { slug, pad } = await params; 
    const pageData = await getPageDataFromCMS(slug, pad);
    
    if (!pageData) {
        return {
            title: 'Pàgina no trobada',
        };
    }

    const { name, summary } = pageData;
    const description = htmlToString(summary);
    return {
        title: `${name}`,
        description: `${description}`,
        alternates: {
            canonical: `https://www.jornadespad.cat/${slug}/${pad}`,
        },
    };
}

export default async function PadPage({ params }: { params: Params }) {
    const { slug, pad } = await params; 
    
    const pageData: PadPageData | null = await getPageDataFromCMS(slug, pad);

    if (!pageData) {
        return notFound(); 
    }

    const { name, place, map, date, when, summary, route, startTime, endTime, bases, localBases, form, image, video, program, isCancelled, isClosed, type } = pageData;
    
    const event = [{name, place, map, route, date, when, summary, startTime, endTime, bases, localBases, form, program, isCancelled, isClosed, type }];
    
    return (
        <>
            <div className={styles.content}>
                <div className={padPageStyles['image-wrapper']}>
                    {image && (
                        <Image
                            src={image}
                            alt={name}
                            className={styles.adhocLogo}
                            fill={true}
                            priority
                        />
                    )}
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
                {video ? (
                    <Video data={video} controls={true} loop={true} />
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

export const dynamicParams = true;
export const revalidate = 30;