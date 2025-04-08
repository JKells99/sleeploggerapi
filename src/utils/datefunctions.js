const getTodaysDate = () => {
    const now = new Date();
    if (isNaN(now.getTime())) {
        throw new Error("Invalid date generated");
    }
    return now.toISOString().slice(0, 10); // format: YYYY-MM-DD
};


const getYesterdayDate = () => {
    const date = new Date();
    date.setDate(date.getDate() - 1);
    return date.toISOString().slice(0, 10);
}

module.exports = {
    getTodaysDate,
    getYesterdayDate
}