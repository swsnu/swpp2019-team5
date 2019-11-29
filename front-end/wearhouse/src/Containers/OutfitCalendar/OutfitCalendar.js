import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import Header from "../Header/Header";
import "./OutfitCalendar.scss";
import {
    faChevronLeft,
    faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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

    onClickDateCell = () => {
        console.log("date cell clicked");
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
                <div id="calendar-wrapper">
                    <div className="calendar-header">
                        <button
                            id="prev-month-button"
                            className="calendar-button"
                            onClick={this.onClickPrevMonth}
                        >
                            <FontAwesomeIcon
                                className="calendar-button-icon"
                                icon={faChevronLeft}
                            ></FontAwesomeIcon>
                        </button>
                        <div id="calendar-year-month">
                            {this.state.year}.{this.state.month}
                        </div>
                        <button
                            id="next-month-button"
                            className="calendar-button"
                            onClick={this.onClickNextMonth}
                        >
                            <FontAwesomeIcon
                                className="calendar-button-icon"
                                icon={faChevronRight}
                            ></FontAwesomeIcon>
                        </button>
                    </div>
                    <Calendar
                        year={this.state.year}
                        month={this.state.month}
                        clicked={this.onClickDateCell}
                    />
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        allOutfits: state.outfit.outfits, // an array of user's all outfit
    };
};

export default connect(
    mapStateToProps,
    null,
)(OutfitCalendar);
