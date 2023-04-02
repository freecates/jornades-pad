import { Inter } from 'next/font/google';
import { IEvent } from '@/app/interfaces';
import styles from './EventsList.module.scss';

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
                        <h2 className={inter.className}>
                            {e.name} <span className={styles.right}>-&gt;</span>
                        </h2>
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
                        </ul>
                    </div>
                ) : null,
            )}
        </div>
    );
};

export default EventsList;