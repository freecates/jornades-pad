import { Inter } from 'next/font/google';
import api from '@/libs/api.js';

import styles from '../page.module.scss';
import PostsList from '@/componnents/PostsList';

const inter = Inter({ subsets: ['latin'] });

const PostsPage = async () => {
    const { posts } = await getData();
    return (
        <>
            <div className={styles.content}>
                <h1 className={`${inter.className}`}>Blog</h1>
                <PostsList posts={posts} />
            </div>
        </>
    );
};



const getData = async () => {
    const posts = await api.wpData.getData('posts', 100, null, 23);

    if (!posts.data) {
        return { posts };
    } else {
        return { posts: null };
    }
};

export default PostsPage;
