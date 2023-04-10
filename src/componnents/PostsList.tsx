import { Inter } from 'next/font/google';
import { dateToLocale } from '@/utils/dateToLocale';
import styles from './PostsList.module.scss';
import Link from 'next/link';
import { IPost } from '@/interfaces';

type Props = {
    posts: IPost[];
};

const inter = Inter({ subsets: ['latin'] });
const PostsList: React.FC<Props> = ({ posts }) => {
    return (
        <div className={styles.grid}>
            {posts.map((p, id) =>
                p.id ? (
                    <div className={styles.card} key={id}>
                        <Link href={`/blog/${p.id}/${p.slug}`}>
                            <h2
                                className={`${inter.className}`}
                                dangerouslySetInnerHTML={{
                                    __html: `${p.title.rendered} <span class=${styles.right}>-&gt;</span>`,
                                }}
                            />
                        </Link>
                        <p className={inter.className}>
                            <small>
                                {p?.['_embedded'].author[0]?.name} | {dateToLocale(p?.date, 'ca')}
                            </small>
                        </p>
                    </div>
                ) : null,
            )}
        </div>
    );
};

export default PostsList;
