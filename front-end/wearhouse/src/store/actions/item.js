import * as actionTypes from "./actionTypes";
import axios from "axios";

export const createItem_ = item => {
    return {
        type: actionTypes.CREATE_ITEM,
        user_id: 1, //after log in is implemented this should be changed this is temporary one
    };
};
export const createItem = (outfit_id, item) => {
    return dispatch => {
        return axios.post("outfit/" + outfit_id + "item", item).then(res => {
            dispatch(createItem_(res.data));
        });
    };
};
