import React from "react";
import { connect } from "react-redux";
//import request from "request";

import "./Recommendation.scss";

import * as actionCreators from "../../store/actions/index";

// const lat = 37.459882;
// const long = 126.9497166;
// const DARK_API_KEY = "25c0e19a13544467a927d2bf945d828a";

class Recommendation extends React.Component {
    // loadWeather = () => {
    //     request.get(
    //         `https://api.darksky.net/forecast/${DARK_API_KEY}/${lat},${long},1573484400?exclude=[currently,minutely,hourly,alerts,flags]&lang=ko&units=auto`,
    //         { json: true },
    //         (err, res) => {
    //             if (err) {
    //                 return console.log(err);
    //             }
    //             console.log(res.body);
    //         },
    //     );
    // };

    componentDidMount = () => {
        this.props.getWeather();
        console.log(this.props.weather);
    };

    render() {
        let weatherSummary;
        let tempInfo;

        return (
            <div id="recommendation">
                <div id="weather-info">
                    Today's Weather: {weatherSummary} at {tempInfo}
                </div>
                <div id="recommendation-text">
                    On {weatherSummary} days at around {tempInfo}, you tend to
                    wear:
                </div>
                <div id="recommendation-container"></div>
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
