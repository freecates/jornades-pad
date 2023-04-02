import api from '@/app/libs/api.js';
import { IRoute } from '@/app/interfaces';
import type { Metadata } from 'next';
import './globals.css';
import styles from './layout.module.scss';
import Footer from './componnents/Footer';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    const {
        footer: { routes: footerLinks },
    }: {
        footer: {
            routes: IRoute[];
        };
    } = await getData();
    return (
        <html lang='ca'>
            <body>
                <main className={styles.main}>
                    {children}
                    <Footer footerLinks={footerLinks} />
                </main>
            </body>
        </html>
    );
}

const getData = async () => {
    const [footer] = await Promise.all([
        api.padData.getData('footer'),
    ]);

    return {
        footer: { ...footer[0] },
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
            canonical: 'https://jornades-pad.cat/',
        },
    };
};

export { generateMetadata };
