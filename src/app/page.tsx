import Video from '@/componnents/Video';
import api from '@/libs/api.js';
import styles from './page.module.scss';

type HomeProps = {
    home: {
        content: {
            when: string;
            where: string;
        };
        videos: {
            mainVideo: {
                width: string;
                height: string;
                srcSet: {
                    src: string;
                    type: string;
                    map(arg0: (d: any, index: any) => JSX.Element): import('react').ReactNode;
                };
            };
        };
    };
};

export default async function Home() {
    const { home }: HomeProps = await getData();
    return (
        <>
            <div className={styles.center}>
                <div className={styles.wrapperVideo}>
                    <Video data={home.videos.mainVideo} />
                </div>
            </div>
        </>
    );
}

const getData = async () => {
    const [home] = await Promise.all([api.padData.getData('home')]);
    return {
        home: { ...home[0] },
    };
};
