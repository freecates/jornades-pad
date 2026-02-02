import { IVideo } from '@/interfaces';
import styles from './Video.module.scss';

type VideoProps = {
    data: IVideo
    loop?: boolean;
    muted?: boolean;
    autoPlay?: boolean;
};

const Video: React.FC<VideoProps> = ({ data, ...props }) => {
    return (
        <video className={styles.video} width={data.width} height={data.height} {...props}>
            {data.srcSet.map((d, index) => (
                <source key={index + d.src} src={d.src} type={d.type} />
            ))}
        </video>
    );
};

export default Video;
