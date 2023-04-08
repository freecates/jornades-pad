import { Inter } from 'next/font/google';
import styles from './Blockquote.module.scss';

const inter = Inter({ subsets: ['latin'] });

const Blockquote = ({ content }) => {
    return (
        <div className={`${styles['blockquote-wrapper']} ${inter.className}`}>
            <blockquote className={styles['blockquote']}>
                <h3>{content}</h3>
            </blockquote>
        </div>
    );
};

export default Blockquote;
