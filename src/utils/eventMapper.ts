import { IEvent } from "@/interfaces";

const eventMapper = (event: any): IEvent => {
    return {
        name: event.title.rendered,
        type: event.type,
        place: event.acf.place,
        map: event.acf.destinationMapURL,
        date: event.acf.date,
        when: undefined,
        route: event.slug,
        summary: event.acf.summary,
        startTime: event.acf.startTime,
        endTime: event.acf.endtime,
        bases: event.acf.bases,
        localBases: event.acf.localBases,
        form: event.acf.formURL,
        program: event.acf.program,
        isCancelled: event.acf.iscancelled,
        isClosed: event.acf.isclosed,
        image: event.acf.image,
    };
};

export default eventMapper;