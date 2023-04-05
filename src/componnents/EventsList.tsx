import { Inter } from 'next/font/google';
import { IEvent } from '@/interfaces';
import styles from './EventsList.module.scss';
import AddToCalendarButtonWrapper from './AddToCalendarButtonWrapper';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

type Props = {
    events: IEvent[];
};
const EventsList: React.FC<Props> = ({ events }) => {
    const dateToLocale = (date: any, locale: string) => {
        const event = new Date(date);
        const options: Intl.DateTimeFormatOptions = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        };
        return event.toLocaleDateString(locale, options);
    };
    return (
        <div className={styles.grid}>
            {events.map((e, id) =>
                e.name ? (
                    <div className={styles.card} key={id}>
                        {events.length > 1 ? (
                            <Link href={`/les-jornades-pad/${e.route}`}>
                                <h2 className={`${inter.className}  ${e.route ? styles[e.route] : ''}`}>
                                    {e.name} <span className={styles.right}>-&gt;</span>
                                </h2>
                            </Link>
                        ) : null}
                        <ul className={inter.className}>
                            <li>
                                <strong>On:</strong> {e.place}{' '}
                                <a title={`Com arribar a: ${e.place}`} href={e.map} target='_blank'>
                                    [<span className={styles.up}>&#8593;</span>]
                                </a>
                            </li>
                            <li>
                                <strong>Quan:</strong> {dateToLocale(e.date, 'ca')}
                            </li>
                            <li><strong>Bases:</strong> properament</li>
                            <li>
                                <AddToCalendarButtonWrapper
                                    name={`Jornades PAD - ${e.name}`}
                                    place={e.place}
                                    date={e.date}
                                    calendars={['Google', 'iCal']}
                                    organizer={'Adhoc Cultura|info@adhoc-cultura.com'}
                                    description={e.summary}
                                    startTime={e.startTime}
                                />
                            </li>
                        </ul>
                    </div>
                ) : null,
            )}
        </div>
    );
};

export default EventsList;
