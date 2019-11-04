import * as actionTypes from "../actions/actionTypes";
const initialState = {
    outfits: [],
    selectedOutfit: null,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_OUTFITS:
            return { ...state, outfits: action.outfits };
        case actionTypes.GET_SPECIFIC_OUTFIT:
            return { ...state, selectedOutfit: action.target };
        case actionTypes.CREATE_OUTFIT: {
            const newOutfit = {
                image: action.image,
                satisfactionValue: action.satisfactionValue,
                date: action.date,
                id: action.id,
                items: action.items,
            };
            const new_outfits = state.outfits.concat(newOutfit);
            return { ...state, outfits: new_outfits };
        }
        default:
            break;
    }
    return state;
};
export default reducer;
