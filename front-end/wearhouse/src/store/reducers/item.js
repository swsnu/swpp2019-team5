import * as actionTypes from "../actions/actionTypes";
const initialState = {
    items: [],
    selectedOutfitItems: [],
    selectedItem: null,
    option_list: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_ITEMS: {
            return { ...state, items: action.items };
        }
        default:
            break;
    }
    return state;
};
export default reducer;
