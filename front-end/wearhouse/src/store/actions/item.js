import * as actionTypes from "./actionTypes";
import axios from "axios";

export const createItem_ = item => {
    return {
        type: actionTypes.CREATE_ITEM,
        category: item.category,
        tags: item.tags,
    };
};
export const createItem = (outfit_id, item) => {
    return dispatch => {
        return axios.post("outfit/" + outfit_id + "item", item).then(res => {
            dispatch(createItem_(res.data));
        });
    };
};
