import React from "react";

const CALENDAR_HEADER = (
    <thead id="calendar-header">
        <tr>
            <th>Sun</th>
            <th>Mon</th>
            <th>Tue</th>
            <th>Wed</th>
            <th>Thur</th>
            <th>Fri</th>
            <th>Sat</th>
        </tr>
    </thead>
);

const renderCalendarBody = dates => {
    let i = 0;
    const rows = [];
    for (let week = 0; week < 5; week++) {
        let day = 0; // Sunday

        let row = [];
        for (let day = 0; day < 7; day++) {
            // Sun Mon Tue Wed ...
            const date = dates[i];
            if (date !== undefined && day === date.getDay()) {
                row.push(
                    <td key={7 * week + day}>
                        <div className="date">{date.getDate()}</div>
                    </td>,
                );
                i++;
            } else {
                row.push(<td key={7 * week + day}></td>);
            }
        }
        rows.push(row);
    }
    return (
        <tbody>
            {rows.map((row, i) => (
                <tr key={i}>{row}</tr>
            ))}
        </tbody>
    );
};

const renderCalendar = dates => (
    <table id="calendar">
        {CALENDAR_HEADER}
        {renderCalendarBody(dates)}
    </table>
);

const Calendar = props => {
    const dates = [];
    const year = props.year;
    const month = props.month - 1; // Date object returns 0 ~ 11
    let maxDate = new Date(year, month + 1, 0).getDate();

    // dates: an array of Date objects
    for (let date = 1; date <= maxDate; date++) {
        dates.push(new Date(year, month, date));
    }

    return renderCalendar(dates);
};

export default Calendar;
