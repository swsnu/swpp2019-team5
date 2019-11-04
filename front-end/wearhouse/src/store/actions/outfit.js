import * as actionTypes from "./actionTypes";
import * as actionCreators from "./item";
import axios from "axios";

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
    for (let i = 0; i < outfit.items.length; i++) {
        actionCreators.createItem(outfit.id, outfit.items[i]);
    }
    return {
        type: actionTypes.CREATE_OUTFIT,
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

export const editOutfit = (outfit_id, outfit) => {
    //this is temporary one just for mid-demo
    return dispatch => {
        return axios.put("outfit/" + outfit_id, outfit).then(() => {
            dispatch(createOutfit_(outfit));
        });
    };
};
