import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import api from '@/libs/api.js';

import styles from '../page.module.scss';
import PostsList from '@/componnents/PostsList';

const inter = Inter({ subsets: ['latin'] });

const PostsPage = async () => {
    const { activitats } = await getData();
    return (
        <>
            <div className={styles.content}>
                <h1 className={`${inter.className}`}>Blog</h1>
                <PostsList posts={activitats} />
            </div>
        </>
    );
};

const getData = async () => {
    const activitats = await api.wpData.getData('activitats', 100, null, 23, 30);

    if (!activitats.data) {
        return { activitats };
    } else {
        return { activitats: null };
    }
};

export const metadata: Metadata = {
    title: 'Blog',
    description: 'Darreres entrades del blog Patrimoni Art Digital',
    alternates: {
        canonical: `https://www.jornadespad.cat/blog`,
    },
};

export default PostsPage;
