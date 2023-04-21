import Link from 'next/link';
import Image from 'next/image';
import styles from './Header.module.scss';

const Header = () => {
    return (
        <div className={`${styles.description} ${styles['slug-description']}`}>
            <p>
                <Link href={'/'}>
                    <Image
                        className={styles.logo}
                        src='/jornades-pad.png'
                        alt='Jornades PAD Logo'
                        width={160}
                        height={49}
                        priority
                    />
                </Link>
            </p>
            <div>
                <a href='https://www.adhoc-cultura.com/' target='_blank' rel='noopener noreferrer'>
                    By{' '}
                    <Image
                        src='/adhoc-cultura-100.png'
                        alt='Adhoc Logo'
                        className={styles.adhocLogo}
                        width={100}
                        height={65}
                        priority
                    />
                </a>
            </div>
        </div>
    );
};

export default Header;
