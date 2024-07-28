module.exports = {
    format_date: (date) => {
        // Format date as MM/DD/YYYY
        const formattedDate = date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        });

        // Format time as HH:MM AM/PM
        const formattedTime = date.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        });

        return `${formattedDate} ${formattedTime}`;
    },
};
