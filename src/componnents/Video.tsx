import styles from './Video.module.scss';

import type { JSX } from "react";

type VideoProps = {
    data: {
        width: string;
        height: string;
        srcSet: {
            src: string;
            type: string;
            map(arg0: (d: any, index: any) => JSX.Element): import('react').ReactNode;
        };
    };
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
