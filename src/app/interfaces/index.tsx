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