import { Inter } from 'next/font/google';
import { IEvent } from '@/interfaces';
import { dateToLocale } from '@/utils/dateToLocale';
import styles from './EventsList.module.scss';
import AddToCalendarButtonWrapper from './AddToCalendarButtonWrapper';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

type Props = {
    events: IEvent[];
};
const EventsList: React.FC<Props> = ({ events }) => {
    return (
        <div className={styles.grid}>
            {events.map((e, id) =>
                e.name ? (
                    <div className={styles.card} key={id}>
                        {events.length > 1 ? (
                            <Link href={`/les-jornades-pad/${e.route}`}>
                                <h2
                                    className={`${inter.className}  ${
                                        e.route ? styles[e.route] : ''
                                    }`}
                                >
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
                            <li>
                                <strong>Programa:</strong>{' '}
                                {e.program ? (
                                    <a
                                        title={`Descarregar: ${e.program}`}
                                        href={e.program}
                                        download
                                    >
                                        [<span className={styles.down}>&#8595;</span>]
                                    </a>
                                ) : (
                                    'properament'
                                )}
                            </li>
                            <li>
                                <strong>Bases:</strong>{' '}
                                {e.bases ? (
                                    <a
                                        title={`Consultar: ${e.bases}`}
                                        href={e.bases}
                                        target='_blank'
                                    >
                                        [<span className={styles.up}>&#8593;</span>]
                                    </a>
                                ) : (
                                    'properament'
                                )}
                            </li>
                            <li>
                                <strong>Participa-hi:</strong>{' '}
                                {e.form ? (
                                    <a
                                        title={`Consultar: ${e.form}`}
                                        href={e.form}
                                        target='_blank'
                                    >
                                        [<span className={styles.up}>&#8593;</span>]
                                    </a>
                                ) : (
                                    'properament'
                                )}
                            </li>
                            <li>
                                <AddToCalendarButtonWrapper
                                    name={`Jornades PAD - ${e.name}`}
                                    place={e.place}
                                    date={e.date}
                                    calendars={['Google', 'iCal', 'Outlook.com']}
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
