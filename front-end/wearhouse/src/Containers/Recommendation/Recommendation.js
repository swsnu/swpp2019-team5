import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
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
    faMapMarkerAlt,
    faChevronDown,
    faChevronUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Outfit from "../../Components/Outfit/Outfit";

import "./Recommendation.scss";

import * as actionCreators from "../../store/actions/index";

export var iconText = {
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
class Recommendation extends React.Component {
    state = {
        showRecommendation: true,
        displayWeather: false,
    };
    componentDidMount = () => {
        if (!this.props.weather) {
            this.props.getWeather();
        }
    };

    onClickOutfit = outfit => {
        this.props.history.push("/outfitDetail/" + outfit.id);
    };

    showModeToggle = value => {
        this.setState({ showRecommendation: value });
    };

    render() {
        let weatherSummary;
        let tempInfo;
        let tempAvg;
        let recommendationList = [];
        let displayWeather;

        if (this.props.weather) {
            weatherSummary = this.props.weather.summary;
            tempInfo =
                this.props.weather.temperatureHigh.toFixed(1) +
                "°C / " +
                this.props.weather.temperatureLow.toFixed(1) +
                "°C";
            tempAvg =
                (this.props.weather.temperatureHigh +
                    this.props.weather.temperatureLow) /
                2;

            recommendationList = this.props.outfits.filter(outfit => {
                return (
                    outfit.weather.icon === this.props.weather.icon &&
                    Math.abs(outfit.weather.tempAvg - tempAvg) < 3 &&
                    outfit.satisfactionValue >= 4
                );
            });
            displayWeather = true;
        } else {
            displayWeather = false;
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
                {displayWeather ? (
                    this.state.showRecommendation ? (
                        <div id="recommendation-wrapper">
                            <div
                                id="open-button"
                                onClick={() => {
                                    this.showModeToggle(false);
                                }}
                            >
                                <FontAwesomeIcon icon={faChevronUp} />
                            </div>
                            {recommendationItems.length !== 0 ? (
                                <div id="recommendation-container">
                                    <div id="weather-info">
                                        <div id="weather-icon">
                                            {iconText[this.props.weather.icon]}
                                        </div>
                                        <div id="weather-text">
                                            <div id="weather-temp">
                                                {tempInfo}
                                            </div>
                                            <div id="weather-summary">
                                                {weatherSummary}
                                            </div>
                                            <div id="weather-loc">
                                                <FontAwesomeIcon
                                                    icon={faMapMarkerAlt}
                                                />{" "}
                                                Seoul
                                            </div>
                                        </div>
                                    </div>

                                    <div id="recommendation-info">
                                        <div id="recommendation-text">
                                            Recommended for days like this:
                                        </div>
                                        <div id="recommendation-items">
                                            {recommendationItems}
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div id="weather-info">
                                    <div id="weather-icon">
                                        {iconText[this.props.weather.icon]}
                                    </div>
                                    <div id="weather-text">
                                        <div id="weather-temp">{tempInfo}</div>
                                        <div id="weather-summary">
                                            {weatherSummary}
                                        </div>
                                        <div id="weather-loc">
                                            <FontAwesomeIcon
                                                icon={faMapMarkerAlt}
                                            />{" "}
                                            Seoul
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div id="folded">
                            <div
                                id="open-button"
                                onClick={() => {
                                    this.showModeToggle(true);
                                }}
                            >
                                <FontAwesomeIcon icon={faChevronDown} />
                            </div>
                        </div>
                    )
                ) : null}
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
        getWeather: () => dispatch(actionCreators.getWeather()),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withRouter(Recommendation));
