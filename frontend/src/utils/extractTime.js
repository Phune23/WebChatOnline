export function extractTime(dateString) {
    const daysOfWeek = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
    const date = new Date(dateString);
    const hours = padZero(date.getHours());
    const dayIndex = date.getDay();
    const minutes = padZero(date.getMinutes());

    return `${daysOfWeek[dayIndex]} [ ${hours} : ${minutes} ]`;
};

//Helper function to pad single-digit numbers with a leading zero
function padZero(number) {
    return number.toString().padStart(2, "0");
};