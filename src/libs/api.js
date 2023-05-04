const staticDataUrl = process.env.STATIC_DATA_URL;
const wordPressApiUrl = process.env.WORDPRESS_API_URL;

const api = {
    padData: {
        async getData(fileName) {
            const response = await fetch(`${staticDataUrl}/data/${fileName}.json`);
            const data = response.status !== 200 ? null : await response.json();
            return data;
        },
    },
    wpData: {
        async getData(type, amount, id, category, revalidate) {
            const response = await fetch(
                `${wordPressApiUrl}/wp/v2/${type}${id ? '/' + id : ''}?${
                    amount ? 'per_page=' + amount + '&' : ''
                }${
                    category ? '&' + 'categories=' + category + '&' : ''
                }_embed`,
                { next: { revalidate: revalidate } },
            );
            const data = await response.json();
            return data;
        },
    },
    mdContent: {
        async getData(slug) {
            const response = await fetch(`${staticDataUrl}/content/${slug}.md`);
            const data = response.status !== 200 ? null : await response.text();
            if (data?.includes('NOT_FOUND')) return null;
            return data;
        },
    },
};

export default api;
