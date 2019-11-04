import * as actionTypes from "./actionTypes";
import * as actionCreators from "./tag";
import axios from "axios";

export const createItem_ = item => {
    for (let i = 0; i < item.tags.length; i++) {
        actionCreators.createTag(item.id, item.tags[i]);
    }
    return {
        type: actionTypes.CREATE_ITEM,
        category: item.category,
        tags: item.tags,
        id: item.id,
    };
};
export const createItem = (outfit_id, item) => {
    return dispatch => {
        return axios.post("outfit/" + outfit_id + "/item", item).then(res => {
            dispatch(createItem_(res.data));
        });
    };
};
