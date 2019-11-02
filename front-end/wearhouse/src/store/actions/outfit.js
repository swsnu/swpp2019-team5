import * as actionTypes from "./actionTypes";
import axios from "axios";

export const getOutfits_ = outfits => {
    return { type: actionTypes.GET_OUTFITS, outfits: outfits };
};

export const getOutfits = () => {
    return dispatch => {
        return axios
<<<<<<< HEAD
            .get("outfit/")
=======
            .get("/api/outfit")
>>>>>>> 906d49dde1cd5d8be4d92c2efb49685fc09eb9ee
            .then(res => dispatch(getOutfits_(res.data)));
    };
};

export const getSpecificOutfit_ = outfit => {
    return {
        type: actionTypes.GET_SPECIFIC_OUTFIT,
        target: outfit,
    };
};

export const getSpecificOutfit = id => {
    return dispatch => {
<<<<<<< HEAD
        return axios.get("outfit/" + id).then(res => {
=======
        return axios.get("/api/outfit/" + id).then(res => {
>>>>>>> 906d49dde1cd5d8be4d92c2efb49685fc09eb9ee
            dispatch(getSpecificOutfit_(res.data));
        });
    };
};

export const createOutfit_ = outfit => {
    return {
        type: actionTypes.CREATE_OUTFIT,
        user_id: 1, //after log in is implemented this should be changed this is temporary one
        image: outfit.image,
        satisfactionValue: outfit.satisfactionValue,
        date: outfit.date,
        id: outfit.id,
        items: outfit.items,
    };
};
export const createOutfit = outfit => {
    return dispatch => {
        return axios.post("outfit/", outfit).then(res => {
            dispatch(createOutfit_(res.data));
        });
    };
};
