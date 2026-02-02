import { IVideo } from "@/interfaces";

const videoMapper = (video: any): IVideo => {
    return {
        width: video.width,
        height: video.height,
        srcSet: video.srcSet ? video.srcSet.map((src: any) => ({
            src: src.src,
            type: `${src.type}/${src.subtype}`,
        })) : [{src: video.url, type: `${video.type}/${video.subtype}`}],
    };
};

export default videoMapper;