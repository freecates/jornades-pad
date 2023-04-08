const sorted = (data, type) => {
    const sortedData = data.sort((a, b) => {
        const idA = a[type];
        const idB = b[type];

        {
            if (idA < idB) {
                return -1;
            }
            if (idA > idB) {
                return 1;
            }
            return 0;
        }
    });
    return sortedData;
};

export { sorted };
