import Image from 'next/image';
import { Inter } from 'next/font/google';
import styles from './ProducersGrid.module.scss';
import { IProducer } from '@/interfaces';

const ProducersType = {
    organizer: 'Organitza',
    participant: 'Amb la participació de',
    supporter: 'Amb el suport de',
    collaborator: 'Amb la col·laboració de',
    sponsor: 'Amb el patrocini de',
};

type Props = {
    producers: [
        {
            organizers: IProducer[];
            participants: IProducer[];
            supporters: IProducer[];
            collaborators: IProducer[];
            sponsors: IProducer[];
        },
    ];
};

const inter = Inter({ subsets: ['latin'] });
const ProducersGrid: React.FC<Props> = ({ producers }) => {
    return (
        <div className={styles.grid}>
            {producers.map((p, id) => (
                <div key={id}>
                    {p.organizers ? (
                        <div className={styles.card}>
                            <h4 className={inter.className}>
                                {ProducersType[p.organizers[0].type]}
                            </h4>
                            <div className={styles.flex}>
                                {p.organizers.map((o, id) => (
                                    <div key={id}>
                                        <Image
                                            className={styles.adhocLogo}
                                            src={`/${o.url}`}
                                            alt={o.name}
                                            width={80}
                                            height={80}
                                        />
                                        <p className={inter.className}>
                                            <small>{o.name}</small>
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : null}
                    {p.participants ? (
                        <div className={styles.card}>
                            <h4 className={inter.className}>
                                {ProducersType[p.participants[0].type]}
                            </h4>
                            <div className={styles.flex}>
                                {p.participants.map((o, id) => (
                                    <div key={id}>
                                        <Image
                                            className={styles.adhocLogo}
                                            src={`/${o.url}`}
                                            alt={o.name}
                                            width={80}
                                            height={80}
                                        />
                                        <p className={inter.className}>
                                            <small>{o.name}</small>
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : null}
                    {p.supporters ? (
                        <div className={styles.card}>
                            <h4 className={inter.className}>
                                {ProducersType[p.supporters[0].type]}
                            </h4>
                            <div className={styles.flex}>
                                {p.supporters.map((o, id) => (
                                    <div key={id}>
                                        <Image
                                            className={styles.adhocLogo}
                                            src={`/${o.url}`}
                                            alt={o.name}
                                            width={80}
                                            height={80}
                                        />
                                        <p className={inter.className}>
                                            <small>{o.name}</small>
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : null}
                    {p.collaborators ? (
                        <div className={styles.card}>
                            <h4 className={inter.className}>
                                {ProducersType[p.collaborators[0].type]}
                            </h4>
                            <div className={styles.flex}>
                                {p.collaborators.map((o, id) => (
                                    <div key={id}>
                                        <Image
                                            className={styles.adhocLogo}
                                            src={`/${o.url}`}
                                            alt={o.name}
                                            width={80}
                                            height={80}
                                        />
                                        <p className={inter.className}>
                                            <small>{o.name}</small>
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : null}
                    {p.sponsors ? (
                        <div className={styles.card}>
                            <h4 className={inter.className}>{ProducersType[p.sponsors[0].type]}</h4>
                            <div className={styles.flex}>
                                {p.sponsors.map((o, id) => (
                                    <div key={id}>
                                        <Image
                                            className={styles.adhocLogo}
                                            src={`/${o.url}`}
                                            alt={o.name}
                                            width={80}
                                            height={80}
                                        />
                                        <p className={inter.className}>
                                            <small>{o.name}</small>
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : null}
                </div>
            ))}
        </div>
    );
};

export default ProducersGrid;
