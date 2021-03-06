import React from "react";
import { withRouter } from "react-router";
import "./Calendar.scss";
import {
    faSun,
    faMoon,
    faUmbrella,
    faSnowflake,
    faCloudShowersHeavy,
    faWind,
    faSmog,
    faCloud,
    faCloudSun,
    faCloudMoon,
    faMehBlank,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import horrible from "../Satisfaction/icon-images/1.png";
import bad from "../Satisfaction/icon-images/2.png";
import neutral from "../Satisfaction/icon-images/3.png";
import good from "../Satisfaction/icon-images/4.png";
import great from "../Satisfaction/icon-images/5.png";

var weatherIconText = {
    "clear-day": <FontAwesomeIcon icon={faSun} />,
    "clear-night": <FontAwesomeIcon icon={faMoon} />,
    rain: <FontAwesomeIcon icon={faUmbrella} />,
    snow: <FontAwesomeIcon icon={faSnowflake} />,
    sleet: <FontAwesomeIcon icon={faCloudShowersHeavy} />,
    wind: <FontAwesomeIcon icon={faWind} />,
    fog: <FontAwesomeIcon icon={faSmog} />,
    cloudy: <FontAwesomeIcon icon={faCloud} />,
    "partly-cloudy-day": <FontAwesomeIcon icon={faCloudSun} />,
    "partly-cloudy-night": <FontAwesomeIcon icon={faCloudMoon} />,
};

var satisfactionIconText = [horrible, bad, neutral, good, great];

const CALENDAR_HEADER = (
    <thead id="calendar-header">
        <tr>
            <th>Sun</th>
            <th>Mon</th>
            <th>Tue</th>
            <th>Wed</th>
            <th>Thur</th>
            <th>Fri</th>
            <th className="last-column">Sat</th>
        </tr>
    </thead>
);

const renderCalendarBody = (dates, props) => {
    let i = 0;
    const rows = [];
    for (let week = 0; week < 5; week++) {
        //let day = 0; // Sunday

        let row = [];
        for (let day = 0; day < 7; day++) {
            // Sun Mon Tue Wed ...

            if (dates[i] !== undefined && day === dates[i].date.getDay()) {
                const date = dates[i].date;
                const id = dates[i].outfit_id;

                const imgUrl =
                    typeof dates[i].imageURL === "undefined"
                        ? ""
                        : dates[i].imageURL;
                const outfitImage = {
                    backgroundImage: "url(" + imgUrl + ")",
                };

                let toPush = (
                    <td
                        key={7 * week + day}
                        className={
                            day === 6
                                ? typeof dates[i].outfit_id === "undefined"
                                    ? "last-column"
                                    : "last-column has-outfit"
                                : typeof dates[i].outfit_id === "undefined"
                                ? ""
                                : "has-outfit"
                        }
                        onClick={() => {
                            typeof id !== "undefined" &&
                                props.history.push("/outfitDetail/" + id);
                        }}
                        style={outfitImage}
                    >
                        <div
                            className={
                                typeof dates[i].outfit_id !== "undefined"
                                    ? "calendar-overlay active"
                                    : "calendar-overlay inactive"
                            }
                        ></div>
                        <div className="date-cell-header">
                            <div className="date">{date.getDate()}</div>
                        </div>

                        <div className="date-cell-body">
                            <div className="satisfaction-icon-calendar">
                                {dates[i].satisfactionValue !== null ? (
                                    <img
                                        className="emoticon-on-calendar-cell"
                                        src={
                                            satisfactionIconText[
                                                dates[i].satisfactionValue - 1
                                            ]
                                        }
                                    />
                                ) : (
                                    <FontAwesomeIcon icon={faMehBlank} />
                                )}

                                <div className="weather-icon">
                                    {dates[i].weather !== null
                                        ? weatherIconText[dates[i].weather]
                                        : null}
                                </div>
                            </div>
                        </div>
                    </td>
                );
                row.push(toPush);
                i++;
            } else {
                row.push(
                    <td
                        key={7 * week + day}
                        className={day === 6 ? "last-column" : ""}
                    ></td>,
                );
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

const renderCalendar = (dates, props) => (
    <table id="calendar">
        {CALENDAR_HEADER}
        {renderCalendarBody(dates, props)}
    </table>
);

const Calendar = props => {
    const dates = [];
    const year = props.year;
    const month = props.month - 1; // Date object returns 0 ~ 11
    let maxDate = new Date(year, month + 1, 0).getDate();
    const outfits = props.outfits;

    // dates: an array of Date objects
    for (let date = 1; date <= maxDate; date++) {
        const date_obj = new Date(year, month, date);
        const outfit_per_date = outfits.filter(outfit => {
            return outfit.date === date_obj.getDate();
        });
        let date_dict = {};

        switch (outfit_per_date.length) {
            case 0:
                date_dict = {
                    date: new Date(year, month, date),
                };
                break;
            case 1:
                // eslint-disable-next-line no-case-declarations
                const outfit = outfit_per_date[0];
                date_dict = {
                    date: new Date(year, month, date),
                    satisfactionValue: outfit.satisfactionValue,
                    imageURL: outfit.image,
                    weather: outfit.weatherIcon,
                    outfit_id: outfit.id,
                };
                break;
            default:
                // eslint-disable-next-line no-case-declarations
                let outfit_with_max_satisfaction = outfit_per_date[0];
                for (var i = 1; i < outfit_per_date.length; i++) {
                    if (
                        outfit_per_date[i].satisfactionValue >
                        outfit_with_max_satisfaction.satisfactionValue
                    ) {
                        outfit_with_max_satisfaction = outfit_per_date[i];
                    }
                }
                date_dict = {
                    date: new Date(year, month, date),
                    satisfactionValue:
                        outfit_with_max_satisfaction.satisfactionValue,
                    imageURL: outfit_with_max_satisfaction.image,
                    weather: outfit_with_max_satisfaction.weatherIcon,
                    outfit_id: outfit_with_max_satisfaction.id,
                };
        }
        dates.push(date_dict);
    }

    // console.log(props.history.push("/"));

    return renderCalendar(dates, props);
};

export default withRouter(Calendar);
