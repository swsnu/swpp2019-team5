import * as actionTypes from "./actionTypes";
import axios from "axios";

export const getOutfits_ = outfits => {
    return { type: actionTypes.GET_OUTFITS, outfits: outfits };
};

export const getOutfits = () => {
    return dispatch => {
        return axios
            .get("/api/outfot")
            .then(res => dispatch(getOutfits_(res.data)));
    };
};

export const getSpecificOutfit_ = outfit => {
    return {
        type: actionTypes.GET_SPECIFIC_OUTFIT,
        target: outfit
    };
};

export const getSpecificOutfit = id => {
    return dispatch => {
        return axios.get("/api/articles/" + id).then(res => {
            dispatch(getSpecificOutfit_(res.data));
        });
    };
};
