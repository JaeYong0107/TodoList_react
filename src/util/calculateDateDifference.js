export default function calculateDateDifference(endDate) {
    const start = new Date();
    start.setHours(0, 0, 0, 0);

    const end = new Date(endDate);
    const difference = end - start;

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const years = Math.floor(days / 365);
    const months = Math.floor((days % 365) / 30);
    const remaingDays = days % 30;
    return { days, years, months, remaingDays }
}