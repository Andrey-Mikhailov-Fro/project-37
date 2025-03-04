export type TestApi = {
    id: number,
    name: string,
    type: string,
    status: string,
    siteId: number
};

export type SitesApi = {
    id: number,
    url: string,
};

export type State = {
    tests: TestApi[],
    sites: SitesApi[],
};


export const fetchTests = async () => {
    const response = await fetch('http://127.0.0.1:3100/tests');
    return await response.json() as TestApi[];
};

export const fetchSites = async () => {
    const response = await fetch('http://127.0.0.1:3100/sites');
    return await response.json() as SitesApi[];
};