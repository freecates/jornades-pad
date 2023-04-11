export interface IMeta {
    title: string;
    pageTitle: string;
    pageDescription: string;
}

export interface IRoute {
    map(arg0: (r: any, id: any) => JSX.Element): import('react').ReactNode;
    name: string;
    route: string;
    description?: string;
}

export interface IEvent {
    name: string;
    place: string;
    map: string;
    date: string;
    route: string;
    summary: string;
    startTime: string;
    bases: string;
}

export interface IPost {
    id: number;
    title: {
        rendered: string;
    };
    slug: string;
    _embedded: {
        author: [{ name: string }];
    };
    date: string;
}
