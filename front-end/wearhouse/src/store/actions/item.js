import * as actionTypes from "./actionTypes";
import axios from "axios";

export const getItems_ = items => {
    return { type: actionTypes.GET_ITEMS, items: items };
};

export const getItems = () => {
    return dispatch => {
        return axios
            .get("/api/item")
            .then(res => dispatch(getItems_(res.data)));
    };
};
