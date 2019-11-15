import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Header from "../Header/Header";
import "./OutfitCalendar.scss";

import Calendar from "../../Components/Calendar/Calendar";

var currentTime = new Date();

class OutfitCalendar extends Component {
    state = {
        year: currentTime.getFullYear(),
        month: currentTime.getMonth() + 1,
    };

    onClickPrevMonth = () => {
        this.setState({
            ...this.state,
            year:
                this.state.month === 1 ? this.state.year - 1 : this.state.year,
            month: this.state.month === 1 ? 12 : this.state.month - 1,
        });
    };

    onClickNextMonth = () => {
        this.setState({
            ...this.state,
            year:
                this.state.month === 12 ? this.state.year + 1 : this.state.year,
            month: this.state.month === 12 ? 1 : this.state.month + 1,
        });
    };

    render() {
        return (
            <div className="OutfitCalendar">
                <Header />
                <div className="link">
                    <NavLink to="/browse" exact>
                        Go back to main page
                    </NavLink>
                </div>
                <div className="calendar-header">
                    <button
                        id="prev-month-button"
                        onClick={this.onClickPrevMonth}
                    >
                        prev month
                    </button>
                    {this.state.year}.{this.state.month}
                    <button
                        id="next-month-button"
                        onClick={this.onClickNextMonth}
                    >
                        next month
                    </button>
                </div>
                <Calendar year={this.state.year} month={this.state.month} />
            </div>
        );
    }
}
export default OutfitCalendar;
