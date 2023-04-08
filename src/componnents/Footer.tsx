import { Inter } from 'next/font/google';
import { IRoute } from '@/interfaces';
import styles from './Footer.module.scss';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

type Props = {
    footerLinks: IRoute[];
};

const Footer: React.FC<Props> = ({ footerLinks }) => {
    return (
        <>
            <div className={styles.grid}>
                {footerLinks.map((f, id) =>
                    f.route ? (
                        <Link href={f.route} className={styles.card} key={id}>
                            <h2 className={inter.className}>
                                {f.name} <span>-&gt;</span>
                            </h2>
                            <p className={inter.className}>{f.description}</p>
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
        </>
    );
};

export default Footer;
