import Link from 'next/link';
import Blockquote from './Blockquote';
import SocialSharer from './SocialSharer';

import styles from '@/app/page.module.scss';

type Props = {
    title: string;
    author: string;
    date: string;
    excerpt: string;
    id: string;
    slug: string;
    content: string;
};

const Post: React.FC<Props> = ({ title, author, date, excerpt, id, slug, content }) => {
    const type = 'blog';
    return (
        <>
            <h1
                dangerouslySetInnerHTML={{
                    __html: title,
                }}
            />
            <p>
                <small>
                    {author} | {date}
                </small>
            </p>
            <SocialSharer type={type} id={id} slug={slug} title={title} />
            <Blockquote content={excerpt} />
            {content ? (
                <div
                    className={`${styles['m-b-1']}`}
                    dangerouslySetInnerHTML={{
                        __html: content,
                    }}
                />
            ) : null}
            <SocialSharer type={type} id={id} slug={slug} title={title} />
            <p>
                <small>
                    <Link href={'/blog'}>[tornar]</Link>
                </small>
            </p>
        </>
    );
};

export default Post;
