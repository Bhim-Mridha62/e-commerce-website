export function formatDate(dateString) {
    const inputDate = new Date(dateString);
    
    // Get today's date and time
    const today = new Date();
    // Set the time of today, yesterday, and tomorrow to 00:00:00 for accurate comparison
    today.setHours(0, 0, 0, 0);

    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    // Set the time of the input date to 00:00:00 for accurate comparison
    inputDate.setHours(0, 0, 0, 0);

    // Convert dates to strings for comparison
    const inputDateStr = inputDate.toDateString();
    const todayStr = today.toDateString();
    const yesterdayStr = yesterday.toDateString();
    const tomorrowStr = tomorrow.toDateString();

    // Check if inputDate is today, yesterday, or tomorrow
    if (inputDateStr === todayStr) {
        return "today";
    } else if (inputDateStr === yesterdayStr) {
        return "yesterday";
    } else if (inputDateStr === tomorrowStr) {
        return "tomorrow";
    } else {
        const year = inputDate.getFullYear();
        const month = inputDate.toLocaleString('default', { month: 'short' });
        const day = inputDate.getDate();

        if (year === today.getFullYear()) {
            return `${month} ${day}`;
        } else {
            return `${month} ${day}, ${year}`;
        }
    }
}
export function getDayDifference(dateString1, dateString2) {
    const date1 = new Date(dateString1);
    const date2 = new Date(dateString2);

    // Calculate the difference in milliseconds
    const differenceInMilliseconds = Math.abs(date1 - date2);

    // Convert milliseconds to days
    const millisecondsPerDay = 24 * 60 * 60 * 1000;
    const differenceInDays = Math.ceil(differenceInMilliseconds / millisecondsPerDay);

    return differenceInDays;
}
