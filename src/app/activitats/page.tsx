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

function sortByDateDesc(arr: DataItem[]): DataItem[] {
    return arr.sort(
        (a, b): number =>
            new Date(a.acf.data_de_lactivitat).getTime() -
            new Date(b.acf.data_de_lactivitat).getTime(),
    );
}


const PostsPage = async () => {
    const { activitats } = await getData();
    const orderedActivitats = sortByDateDesc(activitats);
    return (
        <>
            <div className={styles.content}>
                <h1 className={`${inter.className}`}>Activitats</h1>
                <PostsList posts={orderedActivitats} />
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
    title: 'Activitats',
    description: 'Darreres activitats de Patrimoni Art Digital',
    alternates: {
        canonical: `https://www.jornadespad.cat/activitats`,
    },
};

export default PostsPage;
