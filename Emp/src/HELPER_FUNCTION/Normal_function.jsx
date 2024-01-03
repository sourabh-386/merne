

// convert month number in date 

function getMonthName(date) {
    const months = [
        'Jan', 'Feb', 'Mar', 'Apr',
        'May', 'Jun', 'Jul', 'Augu',
        'Sep', 'Oct', 'Nov', 'Dec'
    ];
    const year=date.slice(0,4)
    const month_no =Number(date.slice(5,7))
    return `${months[month_no - 1]} ${year}`;
}

export {getMonthName}
