import Link from 'next/link';
import { Inter } from 'next/font/google';
import Blockquote from './Blockquote';
import SocialSharer from './SocialSharer';

import styles from '@/app/page.module.scss';
import Image from 'next/image';

const inter = Inter({ subsets: ['latin'] });

type Props = {
    title: string;
    author: string;
    date: string;
    excerpt: string;
    id: string;
    slug: string;
    content: string;
    type: string;
    imageURL?: string;
};

const Post: React.FC<Props> = ({
    title,
    author,
    date,
    excerpt,
    id,
    slug,
    content,
    type,
    imageURL,
}) => {
    return (
        <>
            <h1
                className={`${inter.className}`}
                dangerouslySetInnerHTML={{
                    __html: title,
                }}
            />
            <p className={inter.className}>
                <small>
                    {author} | {date}
                </small>
            </p>
            <SocialSharer
                type={type === 'post' ? 'blog' : type}
                id={id}
                slug={slug}
                title={title}
            />
            {imageURL && (
                <div className={styles['image-wrapper']}>
                    <Image src={imageURL} alt={title} fill={true} priority />
                </div>
            )}
            <Blockquote content={excerpt} />
            {content ? (
                <div
                    className={`${inter.className} ${styles['m-b-1']}`}
                    dangerouslySetInnerHTML={{
                        __html: content,
                    }}
                />
            ) : null}
            <SocialSharer
                type={type === 'post' ? 'blog' : type}
                id={id}
                slug={slug}
                title={title}
            />
            <p className={inter.className}>
                <small>
                    <Link href={`/${type === 'post' ? 'blog' : type}`}>[tornar]</Link>
                </small>
            </p>
        </>
    );
};

export default Post;
