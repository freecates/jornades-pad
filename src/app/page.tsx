import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from './page.module.css'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          Juny, juliol, octubre i desembre<br/>
          <code className={styles.code}>Terrassa, Santa Coloma de Queralt, Vic i Mataró</code>
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
              className={styles.vercelLogo}
              width={100}
              height={52}
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

      <div className={styles.grid}>
        <Link
          href="/el-pad"
          className={styles.card}
        >
          <h2 className={inter.className}>
            El PAD <span>-&gt;</span>
          </h2>
          <p className={inter.className}>
          PAD (Patrimoni Art Digital) una proposta d’arts digitals que dirigeix la Nut, la nostra influencer digital...
          </p>
        </Link>

        <Link
          href="/la-nut"
          className={styles.card}
        >
          <h2 className={inter.className}>
            La Nut <span>-&gt;</span>
          </h2>
          <p className={inter.className}>La Nut és una influencer, però no una influencer com a qualsevol altre, és una influencer digital!</p>
        </Link>

        <Link
          href="/jornades-pad"
          className={styles.card}
        >
          <h2 className={inter.className}>
            Jornades PAD <span>-&gt;</span>
          </h2>
          <p className={inter.className}>
            PAD_3DT / PAD_ESPIGA'T / PAD_MEV / PAD_FIDA
          </p>
        </Link>
      </div>
    </main>
  )
}
