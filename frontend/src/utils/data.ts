export const formatDate = (date: Date | string): string => {
    const newDate = new Date(date)
    return newDate.toLocaleDateString('en-UK', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })
}
