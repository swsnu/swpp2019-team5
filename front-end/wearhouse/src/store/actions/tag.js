import * as actionTypes from "./actionTypes";
import axios from "axios";

export const createTag_ = tag => {
    return {
        type: actionTypes.CREATE_TAG,
        tag: tag,
        id: tag.id,
    };
};
export const createTag = (item_id, tag) => {
    return dispatch => {
        return axios.post("item/" + item_id + "/tag", tag).then(res => {
            dispatch(createTag_(res.data));
        });
    };
};
