import React, { Component } from "react";
import calendar from "../../../src/sample/calendar.jpg";
import Header from "../Header/Header";
import "./Calendar.scss";
class Calendar extends Component {
    render() {
        return (
            <div className="Calendar">
                <Header />
                <img id="calendar" src={calendar} />
            </div>
        );
    }
}
export default Calendar;
