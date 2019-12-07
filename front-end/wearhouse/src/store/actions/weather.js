import * as actionTypes from "./actionTypes";
import axios from "axios";

export const getWeather_ = data => {
    return { type: actionTypes.GET_WEATHER, weather: data };
};

export const getWeather = () => {
    //let time = Date.now();

    return dispatch => {
        return axios.get("/api/weather").then(res => {
            dispatch(getWeather_(res.data));
        });
    };
};

export const getSpecificDayWeather_ = weather => {
    console.log(weather, "here is weather");
    return { type: actionTypes.GET_SPEC_WEATHER, selectedDayWeather: weather };
};
export const getSpecificDayWeather = time => {
    //date needs to be passed as a unix timestamp value
    //let time = date.getUnixTime(); //convert the 'date' information to a unix timestamp
    return dispatch => {
        return axios.get("/api/weather/" + time).then(res => {
            dispatch(getSpecificDayWeather_(res.data));
        });
    };
};
