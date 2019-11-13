import * as actionTypes from "./actionTypes";
import axios from "axios";

const lat = 37.459882;
const long = 126.9497166;
const DARK_API_KEY = "25c0e19a13544467a927d2bf945d828a";

export const getWeather_ = weather => {
    return { type: actionTypes.GET_WEATHER, weather: weather };
};

export const getWeather = () => {
    //let time = Date.now();

    return dispatch => {
        return axios.get("api/weather").then(res => {
            dispatch(getWeather_(res.data));
        });
    };
};

export const getSpecificDayWeather_ = weather => {
    return { type: actionTypes.GET_WEATHER, selectedDayWeather: weather };
};
export const getSpecificDayWeather = date => {
    //date needs to be passed as a unix timestamp value
    return dispatch => {
        return axios
            .get(
                `https://api.darksky.net/forecast/${DARK_API_KEY}/${lat},${long},${date}?exclude=[currently,minutely,hourly,alerts,flags]&lang=ko&units=auto`,
            )
            .then(res => {
                dispatch(getSpecificDayWeather(res.data));
            });
    };
};
