const htmlEntityToString = (string: string) =>
    string.replace(/&#(\d+);/g, function (match, dec) {
        return String.fromCharCode(dec);
    });

export { htmlEntityToString };
