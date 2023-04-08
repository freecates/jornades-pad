const dateToLocale = (date: any, locale: string) => {
    const event = new Date(date);
    const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };
    return event.toLocaleDateString(locale, options);
};

export { dateToLocale };