import * as actionTypes from "../actions/actionTypes";

const initialState = {
    todayWeather: { temperatureHigh: "", temperatureLow: "" }, // this is kept in the state whenever date is loaded to
    selectedDayWeather: null,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_WEATHER:
            return { ...state, todayWeather: action.weather };
        case actionTypes.GET_SPEC_WEATHER:
            return { ...state, selectedDayWeather: action.selectedDayWeather };
        default:
            break;
    }
    return state;
};
export default reducer;
