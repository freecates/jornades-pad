'use client';
import {
    EmailIcon,
    EmailShareButton,
    FacebookIcon,
    FacebookShareButton,
    LinkedinIcon,
    LinkedinShareButton,
    TwitterIcon,
    TwitterShareButton,
    WhatsappIcon,
    WhatsappShareButton,
} from 'react-share';
import styles from './SocialSharer.module.scss';

type SocialShareProps = {
    type: string;
    id: string;
    slug: string;
    title: string;
};

const SocialSharer: React.FC<SocialShareProps> = ({ type, id, slug, title }) => {
    return (
        <div className={`${styles.socialShareComponent}`}>
            <div className={styles.PostSomeNetwork}>
                <FacebookShareButton
                    url={`https://jornadespad.cat/${type}/${id}/${slug}`}
                    quote={title}
                    hashtag={'#JornadesPad'}
                    className='Post__some-network__share-button'
                >
                    <FacebookIcon size={25} round />
                </FacebookShareButton>
            </div>

            <div className={styles.PostSomeNetwork}>
                <TwitterShareButton
                    url={`https://jornadespad.cat/${type}/${id}/${slug}`}
                    title={title}
                    hashtags={['BeneidaBogeria']}
                    via='cdbcn'
                    className='Post__some-network__share-button'
                >
                    <TwitterIcon size={25} round />
                </TwitterShareButton>
            </div>

            <div className={styles.PostSomeNetwork}>
                <LinkedinShareButton
                    url={`https://jornadespad.cat/${type}/${id}/${slug}`}
                    title={title}
                    className='Post__some-network__share-button'
                >
                    <LinkedinIcon size={25} round />
                </LinkedinShareButton>
            </div>

            <div className={styles.PostSomeNetwork}>
                <WhatsappShareButton
                    url={`https://jornadespad.cat/${type}/${id}/${slug}`}
                    title={title}
                    className='Post__some-network__share-button'
                >
                    <WhatsappIcon size={25} round />
                </WhatsappShareButton>
            </div>

            <div className={styles.PostSomeNetwork}>
                <EmailShareButton
                    url={`https://jornadespad.cat/${type}/${id}/${slug}`}
                    subject={title}
                    body={`Fes-li un cop d'ull a: "${title}"`}
                    className='Post__some-network__share-button'
                >
                    <EmailIcon size={25} round />
                </EmailShareButton>
            </div>
        </div>
    );
};

export default SocialSharer;
