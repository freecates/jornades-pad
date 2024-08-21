import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import api from '@/libs/api.js';

import styles from '../page.module.scss';
import PostsList from '@/componnents/PostsList';
import { IPost } from '@/interfaces';

interface DataItem extends IPost {
    acf: {
        data_de_lactivitat: string;
    };
}

const inter = Inter({ subsets: ['latin'] });


const PostsPage = async () => {
    const { artistes } = await getData();
    return (
        <>
            <div className={styles.content}>
                <h1 className={`${inter.className}`}>Artistes</h1>
                <PostsList posts={artistes} />
            </div>
        </>
    );
};

const getData = async () => {
    const artistes = await api.wpData.getData('artistes', 100, null, 24, 30);

    if (!artistes.data) {
        return { artistes };
    } else {
        return { artistes: null };
    }
};

export const metadata: Metadata = {
    title: 'Artistes',
    description: 'Artistes de Patrimoni Art Digital',
    alternates: {
        canonical: `https://www.jornadespad.cat/artistes`,
    },
};

export default PostsPage;
