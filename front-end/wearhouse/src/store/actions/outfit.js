import * as actionTypes from "./actionTypes";
import axios from "axios";
import { push } from "connected-react-router";

export const getOutfits_ = outfits => {
    return { type: actionTypes.GET_OUTFITS, outfits: outfits };
};

export const getOutfits = () => {
    return dispatch => {
        return axios
            .get("/api/outfit")
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
        return axios.get("/api/outfit/" + id).then(res => {
            dispatch(getSpecificOutfit_(res.data));
        });
    };
};

export const createOutfit_ = outfit => {
    return {
        type: actionTypes.CREATE_OUTFIT,
        image: outfit.image,
        satisfactionValue: outfit.satisfactionValue,
        date: outfit.date,
        id: outfit.id,
        items: outfit.items,
        weather: outfit.weather,
    };
};
export const createOutfit = outfit => {
    return dispatch => {
        var id;
        return axios
            .post("/api/outfit/", outfit)
            .then(res => {
                dispatch(createOutfit_(res.data));
                id = res.data.id;
            })
            .then(() => dispatch(push("/outfitDetail/" + id)));
    };
};

export const deleteOutfit_ = id => {
    return {
        type: actionTypes.DELETE_OUTFIT,
        targetID: id,
    };
};

export const deleteOutfit = id => {
    return dispatch => {
        return axios.delete("/api/outfit/" + id).then(() => {
            dispatch(deleteOutfit_(id));
        });
    };
};

export const editOutfit_ = outfit => {
    return {
        type: actionTypes.EDIT_OUTFIT,
        targetID: outfit.id,
        new_outfit: outfit,
    };
};

export const editOutfit = outfit => {
    return dispatch => {
        return axios
            .put("/api/outfit/" + outfit.id, outfit)
            .then(() => {
                dispatch(editOutfit_(outfit));
            })
            .then(() => dispatch(push("/outfitDetail/" + outfit.id)));
    };
};
