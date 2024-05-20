import Footer from '@/componnents/Footer';
import Header from '@/componnents/Header';
import { IProducer, IRoute } from '@/interfaces';
import api from '@/libs/api.js';
import type { Metadata } from 'next';
import './globals.css';
import styles from './layout.module.scss';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    const {
        footer: { routes: footerLinks },
        producers,
    }: {
        footer: {
            routes: IRoute[];
        };
        producers: [
            {
                organizers: IProducer[];
                participants: IProducer[];
                supporters: IProducer[];
                collaborators: IProducer[];
                sponsors: IProducer[];
            },
        ];
    } = await getData();
    return (
        <html lang='ca'>
            <body>
                <main className={styles.main}>
                    <Header />
                    {children}
                    <Footer footerLinks={footerLinks} producers={producers} />
                </main>
            </body>
        </html>
    );
}

const getData = async () => {
    const [footer, producers] = await Promise.all([
        api.padData.getData('footer'),
        api.padData.getData('producers'),
    ]);

    return {
        footer: { ...footer[0] },
        producers,
    };
};

const generateMetadata = async (): Promise<Metadata> => {
    const home = await api.padData.getData('home');
    const meta = { ...home[0].meta };
    const { pageTitle, pageDescription } = meta;
    return {
        title: {
            default: pageTitle,
            template: `%s | ${pageTitle}`,
        },
        description: pageDescription,
        alternates: {
            canonical: 'https://www.jornadespad.cat/',
        },
    };
};

export { generateMetadata };
