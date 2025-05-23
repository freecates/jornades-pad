import { IProducer, IRoute } from '@/interfaces';
import styles from './Footer.module.scss';
import Link from 'next/link';
import ProducersGrid from './ProducersGrid';

type Props = {
    footerLinks: IRoute[];
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

const Footer: React.FC<Props> = ({ footerLinks, producers }) => {
    return (
        <div className={styles['footer-wrapper']}>
            <hr className={styles.hr}/>
            <div className={styles.grid}>
                {footerLinks.map((f, id) =>
                    f.route ? (
                        <Link href={f.route} className={styles.card} key={id}>
                            <h2>
                                {f.name} <span>-&gt;</span>
                            </h2>
                        </Link>
                    ) : null,
                )}
                <p className={`${styles['blog-route']}`}>
                    <small>
                        <code>Impulsem l'art digital, la co-creació i els i les artistes emergents a partir de les col·leccions dels museus. Participa del PAD!</code>
                    </small>
                </p>
            </div>
            <hr className={styles.hr}/>
            <ProducersGrid producers={producers} />
        </div>
    );
};

export default Footer;
