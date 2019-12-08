import React, { Component } from "react";
import { connect } from "react-redux";
import Header from "../Header/Header";
import "./OutfitCalendar.scss";
import {
    faChevronLeft,
    faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Calendar from "../../Components/Calendar/Calendar";
import * as actionCreators from "../../store/actions/index";

var currentTime = new Date();

class OutfitCalendar extends Component {
    state = {
        year: currentTime.getFullYear(),
        month: currentTime.getMonth() + 1,
        outfits: null,
    };

    componentDidMount() {
        this.props.getAllOutfits();
    }

    shouldComponentUpdate() {
        return true;
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.outfits !== this.props.outfits) {
            this.setState({ outfits: this.props.outfits });
        }
    }

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
        // console.log(this.state.outfits);
        let outfits_metadata = [];
        if (this.state.outfits !== null) {
            const outfits_of_this_month = this.state.outfits.filter(outfit => {
                const year_of_outfit = outfit.date
                    ? parseInt(outfit.date.split("-")[0])
                    : -1;
                const month_of_outfit = outfit.date
                    ? parseInt(outfit.date.split("-")[1])
                    : 100;

                return (
                    year_of_outfit === this.state.year &&
                    month_of_outfit == this.state.month
                );
            });
            // 보내야하는 정보
            // id, date, image, satisfactionValue, weather.icon
            outfits_metadata = outfits_of_this_month.map(outfit => {
                return {
                    id: outfit.id,
                    month: parseInt(outfit.date.split("-")[1]),
                    date: parseInt(outfit.date.split("-")[2]),
                    image: outfit.image,
                    satisfactionValue: outfit.satisfactionValue,
                    weatherIcon: outfit.weather.icon,
                };
            });
            console.log(outfits_metadata);
        }
        return (
            <div className="OutfitCalendar">
                <Header />
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
                        outfits={outfits_metadata}
                    />
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        outfits: state.outfit.outfits, // an array of user's all outfit
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllOutfits: () => dispatch(actionCreators.getOutfits()),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(OutfitCalendar);
