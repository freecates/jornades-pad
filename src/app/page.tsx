import { IVideo } from '@/interfaces';
import api from '@/libs/api.js';
import Video from '@/componnents/Video';

import styles from './page.module.scss';

type HomeProps = {
    home: {
        content: {
            when: string;
            where: string;
        };
        videos: {
            mainVideo: IVideo;
        };
    };
};

export default async function Home() {
    const { home }: HomeProps = await getData();
    return (
        <>
            <div className={styles.center}>
                <div className={styles.wrapperVideo}>
                    <Video data={home.videos.mainVideo} loop muted autoPlay />
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
