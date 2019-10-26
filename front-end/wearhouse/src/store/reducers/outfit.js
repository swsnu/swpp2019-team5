import * as actionTypes from "../actions/actionTypes";
const initialState = {
    outfits: [],
    selectedOutfit: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_OUTFITS:
            return { ...state, outfits: action.outfits };
        case actionTypes.GET_SPECIFIC_OUTFIT:
            return { ...state, selectedOutfit: action.target };
        default:
            break;
    }
    return state;
};
export default reducer;
