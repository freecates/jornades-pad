import Link from "next/link"
import { Inter } from 'next/font/google';
import Blockquote from "./Blockquote"
import SocialSharer from "./SocialSharer"

import styles from '@/app/page.module.scss';

const inter = Inter({ subsets: ['latin'] });

const Post = ({ title, author, date, excerpt, id, slug, content}) => {
    const type = 'blog';
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
            <SocialSharer type={type} id={id} slug={slug} title={title} />
            <Blockquote content={excerpt} />
            {content ? (
                <div
                    className={`${inter.className} ${styles['m-b-1']}`}
                    dangerouslySetInnerHTML={{
                        __html: content,
                    }}
                />
            ) : null}
            <SocialSharer type={type} id={id} slug={slug} title={title} />
            <p className={inter.className}>
                <small>
                    <Link href={'/blog'}>[tornar]</Link>
                </small>
            </p>
        </>
    )
}

export default Post;
