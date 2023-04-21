import Image from 'next/image'
import { Inter } from 'next/font/google'
import api from '@/libs/api.js';
import styles from './page.module.scss'

const inter = Inter({ subsets: ['latin'] })

type HomeProps = {
  home: {
    content: {
      when: string;
      where: string;
    }
  };
};

export default async function Home() {
  const { home }: HomeProps = await getData();
  return (
    <>
      <div className={styles.description}>
        <p>
          {home.content.when}<br/>
          <code className={styles.code}>{home.content.where}</code>
        </p>
        <div>
          <a
            href="https://www.adhoc-cultura.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{' '}
            <Image
              src="/adhoc-cultura-100.png"
              alt="Adhoc Logo"
              className={styles.adhocLogo}
              width={100}
              height={65}
              priority
            />
          </a>
        </div>
      </div>

      <div className={styles.center}>
        <Image
          className={styles.logo}
          src="/jornades-pad.png"
          alt="Jornades PAD Logo"
          width={320}
          height={98}
          priority
        />
      </div>
    </>
  )
}

const getData = async () => {
    const [home] = await Promise.all([
        api.padData.getData('home'),
    ]);
    return {
        home: { ...home[0] },
    };
};
