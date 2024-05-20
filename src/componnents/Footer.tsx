import { Inter } from 'next/font/google';
import { IProducer, IRoute } from '@/interfaces';
import styles from './Footer.module.scss';
import Link from 'next/link';
import ProducersGrid from './ProducersGrid';

const inter = Inter({ subsets: ['latin'] });

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
                            <h2 className={inter.className}>
                                {f.name} <span>-&gt;</span>
                            </h2>
                        </Link>
                    ) : null,
                )}
                <p className={`${inter.className} ${styles['blog-route']}`}>
                    <small>
                        <Link href={'/blog'}>
                            [blog]
                        </Link>
                    </small>
                </p>
            </div>
            <hr className={styles.hr}/>
            <ProducersGrid producers={producers} />
        </div>
    );
};

export default Footer;
