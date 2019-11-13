import React from "react";
import { connect } from "react-redux";

import Outfit from "../../Components/Outfit/Outfit";

import "./Recommendation.scss";

import * as actionCreators from "../../store/actions/index";

class Recommendation extends React.Component {
    componentDidMount = () => {
        this.props.getWeather();
    };

    render() {
        let weatherSummary;
        let tempInfo;
        let tempAvg;
        let recommendationList = [];

        if (this.props.weather) {
            weatherSummary = this.props.weather.summary;
            tempInfo =
                this.props.weather.temperatureHigh +
                "°C/" +
                this.props.weather.temperatureLow +
                "°C";
            tempAvg =
                (this.props.weather.temperatureHigh +
                    this.props.weather.temperatureLow) /
                2;

            recommendationList = this.props.outfits.filter(outfit => {
                return (
                    outfit.weather.icon === this.props.weather.icon &&
                    Math.abs(outfit.weather.tempAvg - tempAvg) < 3
                );
            });
        }

        const recommendationItems = recommendationList.map(outfit => {
            return (
                <Outfit
                    key={outfit.id}
                    image={outfit.imageUrl}
                    satisfactionValue={outfit.satisfactionValue}
                    date={outfit.date}
                    clicked={() => this.onClickOutfit(outfit)}
                />
            );
        });

        return (
            <div id="recommendation">
                <div id="weather-info">
                    Today's Weather: {weatherSummary} {tempInfo}
                </div>
                <div id="recommendation-text">
                    On days like this, you enjoyed wearing these outfits:
                </div>
                <div id="recommendation-container">{recommendationItems}</div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        outfits: state.outfit.outfits,
        weather: state.weather.todayWeather,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllOufits: () => dispatch(actionCreators.getOutfits()),
        getWeather: () => dispatch(actionCreators.getWeather()),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Recommendation);
